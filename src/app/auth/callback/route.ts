import { NextRequest, NextResponse } from 'next/server';

import { handleNextAuthCallback, applyCallbackCookies } from '@/lib/auth-next';

export async function GET(request: NextRequest) {
  const callbackResult = await handleNextAuthCallback(request);

  if (callbackResult.success) {
    const response = NextResponse.redirect(
      new URL(callbackResult.redirectUrl, request.url),
    );
    return applyCallbackCookies(response, callbackResult);
  } else {
    console.error('Auth callback failed:', callbackResult.error);
    return NextResponse.redirect(
      new URL(callbackResult.redirectUrl, request.url),
    );
  }
}
