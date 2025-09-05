import { createApi } from '@reduxjs/toolkit/query/react';

import { CheckTokenRequest, LoginRequest, LoginResponse, RefreshTokenResponse, RegisterRequest, User } from '@/types';

import { axiosBaseQuery } from './axiosBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000' }), // явно передаем baseUrl
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        data: body, // используем data вместо body для axios
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        data: body, // используем data вместо body для axios
      }),
      invalidatesTags: ['Auth'],
    }),
    checkToken: builder.mutation<User, CheckTokenRequest>({
      query: (body) => ({
        url: '/auth/check',
        method: 'POST',
        data: body, // используем data вместо body для axios
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, { refreshToken: string }>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        data: body, // используем data вместо body для axios
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckTokenMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
