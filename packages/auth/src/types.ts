export interface JWTPayload {
  sub: string;
  exp: number;
  iat: number;
  [key: string]: unknown;
}

export interface AuthConfig {
  ACCESS_TOKEN_COOKIE_NAME: string;
  REFRESH_TOKEN_COOKIE_NAME: string;
  BASE_URL: string;
  CLIENT_ID: string;
  CLIENT_CALLBACK_BASE_URL: string;
  AUTH_FRONTEND_URI: string;
  JWKS_URL: string;
  JWT_ISSUER: string;
  REFRESH_ENDPOINT: string;
  VERIFY_CODE_ENDPOINT: string;
}

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  headers?: Record<string, string>;
}

export interface CookieGetter {
  (name: string): string | undefined;
}

export interface HeadersGetter {
  (name: string): string | undefined;
}

export interface AuthContext {
  config: AuthConfig;
  getCookie: CookieGetter;
  getHeader: HeadersGetter;
  pathname: string;
}