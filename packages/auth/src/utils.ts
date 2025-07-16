import { AuthContext, AuthConfig, CookieGetter, HeadersGetter } from './types';

/**
 * Create an AuthContext from provided functions
 */
export function createAuthContext(
  config: AuthConfig,
  getCookie: CookieGetter,
  getHeader: HeadersGetter,
  pathname: string,
): AuthContext {
  return {
    config,
    getCookie,
    getHeader,
    pathname,
  };
}

/**
 * Create AuthConfig from individual environment variables
 */
export function createAuthConfig(params: {
  ACCESS_TOKEN_COOKIE_NAME?: string;
  REFRESH_TOKEN_COOKIE_NAME?: string;
  BASE_URL?: string;
  CLIENT_ID?: string;
  CLIENT_CALLBACK_BASE_URL?: string;
  AUTH_FRONTEND_URI?: string;
  JWKS_URL?: string;
  JWT_ISSUER?: string;
}): AuthConfig {
  return {
    ACCESS_TOKEN_COOKIE_NAME: params.ACCESS_TOKEN_COOKIE_NAME || 'access_token',
    REFRESH_TOKEN_COOKIE_NAME: params.REFRESH_TOKEN_COOKIE_NAME || 'refresh_token',
    BASE_URL: params.BASE_URL || '',
    CLIENT_ID: params.CLIENT_ID || '',
    CLIENT_CALLBACK_BASE_URL: params.CLIENT_CALLBACK_BASE_URL || '',
    AUTH_FRONTEND_URI: params.AUTH_FRONTEND_URI || '',
    JWKS_URL: params.JWKS_URL || 'http://localhost:4001/.well-known/jwks.json',
    JWT_ISSUER: params.JWT_ISSUER || 'soundwaves-auth',
    REFRESH_ENDPOINT: '/refresh-token',
    VERIFY_CODE_ENDPOINT: '/verify-code',
  };
}

/**
 * Create login redirect URL for OAuth flow
 */
export function createLoginRedirectUrl(
  config: AuthConfig,
  callbackUri: string,
  returnTo?: string,
): string {
  const authUrl = new URL(config.AUTH_FRONTEND_URI);
  const callbackUrl = new URL(callbackUri);
  
  if (returnTo) {
    callbackUrl.searchParams.set('returnTo', returnTo);
  }

  return `${authUrl}login?${new URLSearchParams({
    client_id: config.CLIENT_ID,
    redirect_uri: callbackUrl.toString(),
  }).toString()}`;
}