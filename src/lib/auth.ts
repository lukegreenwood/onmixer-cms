import { jwtVerify, createRemoteJWKSet, decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

import { AUTH_CONFIG } from './auth-config';

export interface JWTPayload {
  sub: string;
  exp: number;
  iat: number;
  [key: string]: unknown;
}

// Create remote JWKS for JWT verification
const JWKS = createRemoteJWKSet(new URL(AUTH_CONFIG.JWKS_URL));

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    // Verify JWT signature using remote JWKS
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: AUTH_CONFIG.JWT_ISSUER,
      audience: AUTH_CONFIG.CLIENT_ID,
    });

    if (!payload || typeof payload === 'string') {
      return null;
    }

    const jwtPayload = payload as JWTPayload;

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (jwtPayload.exp && jwtPayload.exp < currentTime) {
      return null;
    }

    return jwtPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJwt(token);

    if (!decoded || typeof decoded === 'string') {
      return true;
    }

    const payload = decoded as JWTPayload;
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp ? payload.exp < currentTime : true;
  } catch (error) {
    console.error('Token expiration check error:', error);
    return true;
  }
}

export function getAuthCookies(request: NextRequest): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  const accessToken =
    request.cookies.get(AUTH_CONFIG.ACCESS_TOKEN_COOKIE_NAME)?.value || null;
  const refreshToken =
    request.cookies.get(AUTH_CONFIG.REFRESH_TOKEN_COOKIE_NAME)?.value || null;

  return { accessToken, refreshToken };
}

export function setAuthCookies(
  response: NextResponse,
  authResponse: Response,
): NextResponse {
  // Forward all Set-Cookie headers from the auth service
  const setCookieHeaders = authResponse.headers.getSetCookie?.() || [];
  setCookieHeaders.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie);
  });

  return response;
}

export function clearAuthCookies(response: NextResponse): NextResponse {
  response.cookies.delete(AUTH_CONFIG.ACCESS_TOKEN_COOKIE_NAME);
  response.cookies.delete(AUTH_CONFIG.REFRESH_TOKEN_COOKIE_NAME);
  return response;
}
