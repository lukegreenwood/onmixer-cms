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

  // Token is expired or invalid, try to refresh if refresh token exists
  if (refreshToken) {
    console.log('Access token expired, attempting refresh for:', pathname);

    // Check if refresh token is expired before attempting refresh
    if (isTokenExpired(refreshToken)) {
      console.log('Refresh token is also expired, redirecting to login');
      const response = redirectToLogin(request);
      clearAuthCookies(response);
      return response;
    }

    try {
      const refreshUrl = `${AUTH_CONFIG.BASE_URL}${AUTH_CONFIG.REFRESH_ENDPOINT}`;
      const refreshBody = {
        refresh_token: refreshToken,
        client_id: AUTH_CONFIG.CLIENT_ID,
      };
      
      console.log('Making refresh request to:', refreshUrl);
      console.log('With client_id:', AUTH_CONFIG.CLIENT_ID);
      
      const refreshResponse = await fetch(refreshUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': request.headers.get('user-agent') || '',
          'X-Forwarded-For':
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            '',
        },
        body: JSON.stringify(refreshBody),
      });

      if (refreshResponse.ok) {
        console.log('Token refresh successful for:', pathname);
        // Create response and forward all cookies from auth service
        const response = NextResponse.next();
        setAuthCookies(response, refreshResponse);
        return response;
      } else {
        const errorText = await refreshResponse.text();
        console.error(
          'Token refresh failed:',
          refreshResponse.status,
          refreshResponse.statusText,
          'Body:',
          errorText,
        );
      }
    } catch (error) {
      console.error('Token refresh network error:', error);
    }
  } else {
    console.log('No refresh token available, redirecting to login');
  }

  // Refresh failed or no refresh token, clear cookies and redirect to login
  console.error(
    'Authentication failed for:',
    pathname,
    '- clearing cookies and redirecting to login',
  );
  const response = redirectToLogin(request);
  clearAuthCookies(response);
  return response;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const authUrl = new URL(AUTH_CONFIG.AUTH_FRONTEND_URI);
  const callbackUrl = new URL(
    '/auth/callback',
    AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL,
  );
  callbackUrl.searchParams.set(
    'returnTo',
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  const redirectUri = `${authUrl}login?${new URLSearchParams({
    client_id: AUTH_CONFIG.CLIENT_ID,
    redirect_uri: callbackUrl.toString(),
  }).toString()}`;

  return NextResponse.redirect(new URL(redirectUri, request.url));
}

export const config = {
  // Match all routes except API, static files, images, and favicon
  matcher: ['/((?!api|health|_next/static|_next/image|favicon.ico).*)'],
};
