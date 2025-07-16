import { AuthTokens, AuthContext, CookieGetter } from './types';

/**
 * Extract auth tokens from cookies
 */
export function getAuthTokens(
  getCookie: CookieGetter,
  accessTokenCookieName: string,
  refreshTokenCookieName: string,
): AuthTokens {
  const accessToken = getCookie(accessTokenCookieName) || null;
  const refreshToken = getCookie(refreshTokenCookieName) || null;

  return { accessToken, refreshToken };
}

/**
 * Extract auth tokens from context
 */
export function getAuthTokensFromContext(context: AuthContext): AuthTokens {
  return getAuthTokens(
    context.getCookie,
    context.config.ACCESS_TOKEN_COOKIE_NAME,
    context.config.REFRESH_TOKEN_COOKIE_NAME,
  );
}