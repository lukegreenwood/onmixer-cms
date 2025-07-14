import { NextRequest, NextResponse } from 'next/server';

import {
  verifyJWT,
  getAuthCookies,
  setAuthCookies,
  clearAuthCookies,
  isTokenExpired,
} from '@/lib/auth';
import { AUTH_CONFIG } from '@/lib/auth-config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for auth callback and public routes
  if (pathname.startsWith('/auth/callback') || pathname === '/auth') {
    return NextResponse.next();
  }

  const { accessToken, refreshToken } = getAuthCookies(request);

  // If no access token, redirect to login
  if (!accessToken) {
    console.log('No access token found, redirecting to login');
    return redirectToLogin(request);
  }

  // Verify the JWT token
  const payload = await verifyJWT(accessToken);

  if (payload) {
    // Token is valid, proceed with the request
    return NextResponse.next();
  }

  // Token is expired or invalid, try to refresh
  if (refreshToken && !isTokenExpired(refreshToken)) {
    console.log('Access token expired, attempting refresh');

    try {
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
        console.log('Token refresh successful, forwarding new cookies');
        // Create response and forward all cookies from auth service
        const response = NextResponse.next();
        setAuthCookies(response, refreshResponse);
        return response;
      } else {
        console.log(
          'Token refresh failed:',
          refreshResponse.status,
          refreshResponse.statusText,
        );
      }
    } catch (error) {
      console.error('Token refresh error:', error);
    }
  } else {
    console.log('No refresh token available or refresh token expired');
  }

  // Refresh failed or no refresh token, clear cookies and redirect to login
  console.log(
    'Authentication failed, clearing cookies and redirecting to login',
  );
  const response = redirectToLogin(request);
  clearAuthCookies(response);
  return response;
}

function redirectToLogin(request: NextRequest): NextResponse {
  // Redirect to our auth page which will handle the signin flow
  return NextResponse.redirect(new URL('/auth', request.url));
}

export const config = {
  // Match all routes except API, static files, images, and favicon
  matcher: ['/((?!api|health|_next/static|_next/image|favicon.ico).*)'],
};
