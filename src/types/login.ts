export interface Login {
  username: string;
  password: string;
}
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface CheckTokenRequest {
  token: string;
}

export interface User {
  id: number;
  username: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
