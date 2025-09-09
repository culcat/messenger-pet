import { createApi } from '@reduxjs/toolkit/query/react';

import type { Dialog, Message } from '@/types/messages';
import { getSocket } from '@/utils/socket';

import { baseQuery } from './baseQuery';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQuery,
  tagTypes: ['Conversation', 'Dialogs'],
  endpoints: (build) => ({
    // Получение сообщений чата
    getConversationRest: build.query<
      {
        messages: Message[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      },
      { userId: number; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 20 }) => ({
        url: '/messages/conversation',
        method: 'POST',
        body: { userId, page, limit },
      }),

      // кэш на уровне userId
      serializeQueryArgs: ({ queryArgs }) => queryArgs.userId,

      merge: (cache, incoming, { arg }) => {
        const { page } = arg;
        if (page === 1) {
          cache.messages = incoming.messages;
        } else {
          const existingIds = new Set(cache.messages.map((m) => m.id));
          cache.messages.push(...incoming.messages.filter((m) => !existingIds.has(m.id)));
        }
        cache.pagination = incoming.pagination;
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.userId !== previousArg?.userId || currentArg?.page !== previousArg?.page,

      async onCacheEntryAdded({ userId }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          const handler = (message: Message) => {
            console.log('handler', message);
            if ([message.sender.id, message.receiver.id].includes(userId)) {
              console.log('if');

              updateCachedData((draft) => {
                if (!draft.messages.some((m) => m.id === message.id)) {
                  draft.messages.push(message);
                }
              });

              console.log('updated');
            }
          };

          socket.on('new_message', handler);
          await cacheEntryRemoved;
          socket.off('new_message', handler);
        } catch (e) {
          console.error(e);
        }
      },

      providesTags: (_, __, { userId }) => [{ type: 'Conversation', id: userId }],
    }),

    getDialogs: build.query<
      {
        dialogs: Dialog[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: '/messages/dialogs',
        method: 'POST',
        body: { page, limit },
      }),

      // ключ кэша: только страница и лимит
      serializeQueryArgs: ({ queryArgs }) => {
        return `dialogs-${queryArgs.page || 1}-${queryArgs.limit || 20}`;
      },

      merge: (currentCache, newCache, { arg }) => {
        if (!currentCache) {
          return newCache;
        }

        if (arg?.page === 1) {
          currentCache.dialogs = newCache.dialogs.reverse();
        } else {
          currentCache.dialogs.push(...newCache.dialogs);
        }

        currentCache.pagination = newCache.pagination;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page || currentArg?.limit !== previousArg?.limit;
      },

      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          const handler = (dialog: Dialog) => {
            updateCachedData((draft) => {
              draft.dialogs.unshift(dialog); // новые диалоги сверху
            });
          };

          socket.on('new_message', handler);

          await cacheEntryRemoved;
          socket.off('new_message', handler);
        } catch (e) {
          console.error(e);
        }
      },

      providesTags: () => [{ type: 'Dialogs', id: 'LIST' }],
    }),

    // Отправка сообщения через сокет
    sendMessage: build.mutation<void, { text: string; receiverId: number }>({
      queryFn: async ({ text, receiverId }) => {
        try {
          const socket = getSocket();
          socket.emit('send_message', { text, receiverId });
          return { data: undefined };
        } catch (error) {
          return { error: error as any };
        }
      },
      invalidatesTags: (result, error, { receiverId }) => [{ type: 'Conversation', id: receiverId }],
    }),
  }),
});

export const { useGetConversationRestQuery, useSendMessageMutation, useGetDialogsQuery } = messagesApi;
