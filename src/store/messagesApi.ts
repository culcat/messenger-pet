import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ConversationRequest {
  userId: number;
}

interface User {
  id: number;
  username: string;
}

export interface Message {
  id: number;
  text: string;
  sender: User;
  receiver: User;
  createdAt: string;
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getConversation: builder.mutation<Message[], ConversationRequest>({
      query: (body) => ({
        url: '/messages/conversation',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetConversationMutation } = messagesApi;
