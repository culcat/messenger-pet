import Cookies from 'js-cookie';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const TokenService = {
  getAccessToken: (): string | undefined => Cookies.get('access_token'),
  getRefreshToken: (): string | undefined => Cookies.get('refreshToken'),

  setTokens: ({ accessToken, refreshToken }: Tokens): void => {
    Cookies.set('token', accessToken);
    Cookies.set('refreshToken', refreshToken);
  },

  clearTokens: (): void => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },
};
