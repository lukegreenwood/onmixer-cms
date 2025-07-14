import { NextRequest, NextResponse } from 'next/server';

import { setAuthCookies } from '@/lib/auth';
import { AUTH_CONFIG } from '@/lib/auth-config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const returnTo = searchParams.get('returnTo');
  const redirectUri = `${AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL}/auth/callback`;

  if (!code) {
    return NextResponse.redirect(
      new URL(
        `${AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL}/auth?error=missing_code`,
        request.url,
      ),
    );
  }

  try {
    // Exchange auth code for session
    const response = await fetch(
      `${AUTH_CONFIG.BASE_URL}${AUTH_CONFIG.VERIFY_CODE_ENDPOINT}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': request.headers.get('user-agent') || '',
          'X-Forwarded-For':
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            '',
        },
        body: JSON.stringify({
          code,
          client_id: AUTH_CONFIG.CLIENT_ID,
          redirect_uri: redirectUri,
        }),
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Auth callback failed:', result.message);
      return NextResponse.redirect(
        new URL(
          `${AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL}/auth?error=auth_failed`,
          request.url,
        ),
      );
    }

    // Create response and set auth cookies
    const redirectUrl = returnTo 
      ? new URL(returnTo, AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL)
      : new URL(AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL, request.url);
    
    const redirectResponse = NextResponse.redirect(redirectUrl);

    // Forward all cookies from the auth service
    setAuthCookies(redirectResponse, response);

    return redirectResponse;
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(
      new URL(
        `${AUTH_CONFIG.CLIENT_CALLBACK_BASE_URL}/auth?error=server_error`,
        request.url,
      ),
    );
  }
}
