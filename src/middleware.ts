import { NextRequest, NextResponse } from 'next/server';

import {
  authenticateNextRequest,
  applyAuthCookies,
  clearAuthCookies,
  createLoginRedirectUrl,
} from '@/lib/auth-next';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for auth callback and public routes
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  const authResult = await authenticateNextRequest(request);

  if (authResult.success) {
    if (authResult.shouldRefresh) {
      // Apply refresh token cookies
      console.log('Refreshing token for:', pathname);
      const response = NextResponse.next();
      return applyAuthCookies(response, authResult);
    }
    // Token is valid, proceed with the request
    return NextResponse.next();
  } else if (authResult.redirectToLogin) {
    // Authentication failed, clear cookies and redirect to login
    console.error(
      'Authentication failed for:',
      pathname,
      '- error:',
      authResult.error,
    );
    const loginUrl = createLoginRedirectUrl(request);
    const response = NextResponse.redirect(new URL(loginUrl, request.url));
    clearAuthCookies(response);
    return response;
  }

  // Fallback - should not reach here
  console.error('Unexpected auth result for:', pathname);
  const loginUrl = createLoginRedirectUrl(request);
  const response = NextResponse.redirect(new URL(loginUrl, request.url));
  clearAuthCookies(response);
  return response;
}

// Redirect logic moved to auth-next.ts

export const config = {
  // Match all routes except API, static files, images, and favicon
  matcher: ['/((?!api|health|_next/static|_next/image|favicon.ico).*)'],
};
