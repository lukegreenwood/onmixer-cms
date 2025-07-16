import {
  authenticateRequest,
  createAuthContext,
  createAuthConfig,
  handleAuthCallback,
  createLoginRedirectUrl as createGenericLoginRedirectUrl,
  type AuthResult,
  type AuthConfig,
  type CallbackContext,
  type CallbackResult,
} from '@soundwaves/client-auth';
import { NextRequest, NextResponse } from 'next/server';

// Create auth config from environment variables
const AUTH_CONFIG: AuthConfig = createAuthConfig({
  ACCESS_TOKEN_COOKIE_NAME: process.env.AUTH_ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME: process.env.AUTH_REFRESH_TOKEN_COOKIE_NAME,
  BASE_URL: process.env.AUTH_BASE_URL,
  CLIENT_ID: process.env.AUTH_CLIENT_ID,
  CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE,
  AUTH_FRONTEND_URI: process.env.AUTH_FRONTEND_URI,
  JWKS_URL: process.env.AUTH_JWKS_URL,
  JWT_ISSUER: process.env.AUTH_JWT_ISSUER,
});

/**
 * Next.js middleware auth helper
 */
export async function authenticateNextRequest(request: NextRequest): Promise<AuthResult> {
  const context = createAuthContext(
    AUTH_CONFIG,
    (name) => request.cookies.get(name)?.value,
    (name) => request.headers.get(name) || undefined,
    request.nextUrl.pathname,
  );

  return await authenticateRequest(context);
}

/**
 * Next.js callback handler
 */
export async function handleNextAuthCallback(request: NextRequest): Promise<CallbackResult> {
  const context: CallbackContext = {
    config: AUTH_CONFIG,
    getSearchParam: (name) => request.nextUrl.searchParams.get(name),
    getHeader: (name) => request.headers.get(name),
    createRedirectUrl: (url) => new URL(url, AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL).toString(),
    createErrorUrl: (error) => new URL(`/auth?error=${error}`, AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL).toString(),
    setCookie: () => {}, // Not used in this implementation
  };

  return await handleAuthCallback(context);
}

/**
 * Apply auth cookies to Next.js response
 */
export function applyAuthCookies(response: NextResponse, authResult: AuthResult): NextResponse {
  if (authResult.refreshResult?.headers) {
    Object.entries(authResult.refreshResult.headers).forEach(([key, value]) => {
      if (key.startsWith('Set-Cookie-')) {
        response.headers.append('Set-Cookie', value);
      }
    });
  }
  return response;
}

/**
 * Apply callback cookies to Next.js response
 */
export function applyCallbackCookies(response: NextResponse, callbackResult: CallbackResult): NextResponse {
  if (callbackResult.setCookieHeaders) {
    callbackResult.setCookieHeaders.forEach(cookieHeader => {
      response.headers.append('Set-Cookie', cookieHeader);
    });
  }
  return response;
}

/**
 * Clear auth cookies from Next.js response
 */
export function clearAuthCookies(response: NextResponse): NextResponse {
  response.cookies.delete(AUTH_CONFIG.ACCESS_TOKEN_COOKIE_NAME);
  response.cookies.delete(AUTH_CONFIG.REFRESH_TOKEN_COOKIE_NAME);
  return response;
}

/**
 * Create login redirect URL for Next.js
 */
export function createLoginRedirectUrl(request: NextRequest): string {
  const callbackUri = new URL('/auth/callback', AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL).toString();
  const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  
  return createGenericLoginRedirectUrl(AUTH_CONFIG, callbackUri, returnTo);
}

// Export the config for backward compatibility
export { AUTH_CONFIG };