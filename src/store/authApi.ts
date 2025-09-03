import { createApi } from '@reduxjs/toolkit/query/react';

import { CheckTokenRequest, LoginRequest, LoginResponse, RefreshTokenResponse, RegisterRequest, User } from '@/types';

import { baseQueryWithReauth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    checkToken: builder.mutation<User, CheckTokenRequest>({
      query: (body) => ({
        url: '/auth/check',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, { refreshToken: string }>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
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
