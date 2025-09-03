import type { EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { io, Socket } from 'socket.io-client';

import type { Dialog, Message } from '@/types';

import { dialogsAdapter, messagesAdapter } from './messageSlice';

let socket: Socket | null = null;

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
  endpoints: (build) => ({
    getDialogs: build.query<EntityState<Dialog, number>, void>({
      queryFn: async () => {
        return { data: dialogsAdapter.getInitialState() };
      },
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved, getState }) {
        const token = Cookies.get('access_token');
        const socket = io('http://localhost:3000', {
          auth: { token },
          transports: ['websocket'],
        });

        socket.emit('getDialogs');

        socket.on('dialogsList', (dialogs: Dialog[]) => {
          updateCachedData((draft) => {
            dialogsAdapter.setAll(draft, dialogs);
          });
        });

        await cacheEntryRemoved;
        socket.disconnect();
      },
    }),

    getConversation: build.query<EntityState<Message, number>, number>({
      queryFn: async (userId, _queryApi, _extraOptions, fetchWithBQ) => {
        // возвращаем пустой стейт сразу
        return { data: messagesAdapter.getInitialState() };
      },
      async onCacheEntryAdded(userId, { updateCachedData, cacheEntryRemoved }) {
        const token = Cookies.get('access_token');
        const socket = io('http://localhost:3000', {
          auth: { token },
          transports: ['websocket'],
        });

        socket.emit('getConversation', { userId });

        socket.on('conversationHistory', (messages: Message[]) => {
          updateCachedData((draft) => {
            messagesAdapter.setAll(draft, messages);
          });
        });

        socket.on('new_message', (msg: Message) => {
          updateCachedData((draft) => {
            messagesAdapter.upsertOne(draft, msg);
          });
        });

        await cacheEntryRemoved;
        socket.disconnect();
      },
    }),

    sendMessage: build.mutation<void, { text: string; receiverId: number }>({
      queryFn: async ({ text, receiverId }, { getState }) => {
        const token = Cookies.get('access_token');
        if (!socket) {
          socket = io('http://localhost:3000', {
            auth: { token },
            transports: ['websocket'],
          });
        }
        socket.emit('send_message', { text, receiverId });
        return { data: undefined };
      },
    }),
  }),
});

export const { useGetDialogsQuery, useGetConversationQuery, useSendMessageMutation } = messagesApi;
