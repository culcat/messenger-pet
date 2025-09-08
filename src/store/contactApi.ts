import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Contact } from '@/types/contact';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], string>({
      query: (username: string) => `/users/${username}`,
    }),
  }),
});

export const { useGetContactsQuery } = contactApi;
