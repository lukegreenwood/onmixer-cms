import { NextRequest, NextResponse } from 'next/server';

import {
  verifyJWT,
  getAuthCookies,
  setAuthCookies,
  clearAuthCookies,
} from '@/lib/auth';
import { AUTH_CONFIG } from '@/lib/auth-config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for auth callback and public routes
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  const { accessToken, refreshToken } = getAuthCookies(request);

  // If no access token, redirect to login
  if (!accessToken) {
    return redirectToLogin(request);
  }

  // Verify the JWT token
  const payload = await verifyJWT(accessToken);

  if (payload) {
    // Token is valid, proceed with the request
    return NextResponse.next();
  }

  // Token is expired or invalid, try to refresh
  if (refreshToken) {
    const refreshResponse = await fetch(
      `${AUTH_CONFIG.BASE_URL}${AUTH_CONFIG.REFRESH_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      },
    );

    if (refreshResponse.ok) {
      // Create response and forward all cookies from auth service
      const response = NextResponse.next();
      setAuthCookies(response, refreshResponse);
      return response;
    }
  }

  // Refresh failed or no refresh token, clear cookies and redirect to login
  const response = redirectToLogin(request);
  clearAuthCookies(response);
  return response;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const authUrl = new URL(AUTH_CONFIG.AUTH_FRONTEND_URI);
  const redirectUri = `${authUrl}login?${new URLSearchParams({
    client_id: AUTH_CONFIG.CLIENT_ID,
    redirect_uri: `${request.nextUrl.origin}/auth/callback`,
  }).toString()}`;

  return NextResponse.redirect(new URL(redirectUri, request.url));
}

export const config = {
  // Match all routes except API, static files, images, and favicon
  matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico).*)'],
};
