import type { EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Dialog, Message } from '@/types/messages';
import { getSocket } from '@/utils/socket';

import { dialogsAdapter, messagesAdapter } from './messageSlice';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      return headers; // токен в сокете, тут можно убрать
    },
  }),
  endpoints: (build) => ({
    getDialogs: build.query<EntityState<Dialog, number>, void>({
      queryFn: async () => {
        return { data: dialogsAdapter.getInitialState() };
      },
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        const socket = getSocket();

        socket.emit('getDialogs');

        socket.on('dialogsList', (dialogs: Dialog[]) => {
          updateCachedData((draft) => {
            dialogsAdapter.setAll(draft, dialogs);
          });
        });

        await cacheEntryRemoved;
      },
    }),
    getConversation: build.query<EntityState<Message, number>, number>({
      queryFn: async (userId) => {
        const socket = getSocket();

        return new Promise<{ data: EntityState<Message, number> }>((resolve) => {
          socket.emit('getConversation', { userId });

          socket.once('conversationHistory', (messages: Message[]) => {
            resolve({
              data: messagesAdapter.upsertMany(messagesAdapter.getInitialState(), messages) as EntityState<
                Message,
                number
              >,
            });
          });
        });
      },
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        const socket = getSocket();
        socket.on('new_message', (msg: Message) => {
          updateCachedData((draft) => {
            messagesAdapter.upsertOne(draft, msg);
          });
        });

        await cacheEntryRemoved;
      },
    }),

    sendMessage: build.mutation<void, { text: string; receiverId: number }>({
      queryFn: async ({ text, receiverId }) => {
        const socket = getSocket();
        socket.emit('send_message', { text, receiverId });
        return { data: undefined };
      },
    }),
  }),
});

export const { useGetDialogsQuery, useGetConversationQuery, useSendMessageMutation } = messagesApi;
