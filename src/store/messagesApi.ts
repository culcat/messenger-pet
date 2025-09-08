import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import type { Dialog, Message } from '@/types/messages';
import { getSocket } from '@/utils/socket';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Conversation', 'Dialogs'],
  endpoints: (build) => ({
    // Получение сообщений чата
    getConversationRest: build.query<
      {
        messages: Message[];
        pagination: { total: number; page: number; limit: number; totalPages: number };
      },
      { userId: number; page: number; limit: number }
    >({
      query: ({ userId, page = 1, limit = 20 }) => ({
        url: '/messages/conversation',
        method: 'POST',
        body: { userId, page, limit },
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs.userId,
      merge: (currentCache, newCache, { arg }) => {
        if (arg.page === 1) {
          currentCache.messages = newCache.messages;
        } else {
          // добавляем только новые, которых ещё нет
          const existingIds = new Set(currentCache.messages.map((m) => m.id));
          const filtered = newCache.messages.filter((m) => !existingIds.has(m.id));
          currentCache.messages.push(...filtered); // append в конец
        }
        currentCache.pagination = newCache.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        // рефетч если поменялся userId или page
        return currentArg?.userId !== previousArg?.userId || currentArg?.page !== previousArg?.page;
      },
      async onCacheEntryAdded({ userId }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const socket = getSocket();

          const handler = (message: Message) => {
            if (message.sender.id === userId || message.receiver.id === userId) {
              updateCachedData((draft) => {
                // чтобы не дублировать
                if (!draft.messages.find((m) => m.id === message.id)) {
                  draft.messages.push(message);
                }
              });
            }
          };

          socket.on('new_message', handler);

          await cacheEntryRemoved;
          socket.off('new_message', handler);
        } catch {}
      },
      providesTags: (result, error, { userId }) => [{ type: 'Conversation', id: userId }],
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

    // Получение списка диалогов через сокет
    getDialogs: build.query<Dialog[], void>({
      queryFn: async () => ({ data: [] }), // изначально пустой массив
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        const socket = getSocket();

        const handleDialogs = (dialogs: Dialog[]) => {
          updateCachedData(() => dialogs);
        };

        socket.emit('getDialogs');
        socket.on('dialogsList', handleDialogs);

        await cacheEntryRemoved;
        socket.off('dialogsList', handleDialogs);
      },
      providesTags: [{ type: 'Dialogs', id: 'LIST' }],
    }),
  }),
});

export const { useGetConversationRestQuery, useSendMessageMutation, useGetDialogsQuery } = messagesApi;
