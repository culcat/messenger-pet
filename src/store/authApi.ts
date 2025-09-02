import { createApi } from '@reduxjs/toolkit/query/react';

// import * as types from '@/types/login';
import {} from '@/types';

import { baseQueryWithReauth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    register: builder.mutation<types.LoginResponse, types.RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<types.LoginResponse, types.LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    checkToken: builder.mutation<types.User, types.CheckTokenRequest>({
      query: (body) => ({
        url: '/auth/check',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<types.RefreshTokenResponse, { refreshToken: string }>({
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
