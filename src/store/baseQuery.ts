import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import { RefreshTokenResponse } from '@/types/login';
import { TokenService } from '@/utils/tokenService';
export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers) => {
    const token = TokenService.getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      const refreshToken = TokenService.getRefreshToken();

      if (refreshToken) {
        try {
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh',
              method: 'POST',
              body: { refreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const tokens = refreshResult.data as RefreshTokenResponse;
            TokenService.setTokens(tokens);

            pendingRequests.forEach((callback) => callback());
            pendingRequests = [];

            result = await baseQuery(args, api, extraOptions);
          }
        } catch (error) {
          console.error('Refresh token failed:', error);
          TokenService.clearTokens();
        } finally {
          isRefreshing = false;
        }
      } else {
        TokenService.clearTokens();
      }
    } else {
      return new Promise((resolve) => {
        pendingRequests.push(() => {
          resolve(baseQuery(args, api, extraOptions));
        });
      });
    }
  }

  return result;
};
