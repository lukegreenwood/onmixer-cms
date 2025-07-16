import { jwtVerify, createRemoteJWKSet, decodeJwt } from 'jose';
import { JWTPayload, AuthConfig } from './types';

/**
 * Get or create JWKS for a given URL
 */
function getJWKS(jwksUrl: string) {
  return createRemoteJWKSet(new URL(jwksUrl), {
    cacheMaxAge: 10 * 60 * 1000, // 10 minutes
    cooldownDuration: 60 * 1000, // 60 seconds
  });
}

/**
 * Verify JWT token using remote JWKS
 */
export async function verifyJWT(
  token: string,
  config: AuthConfig,
): Promise<JWTPayload | null> {
  try {
    const JWKS = getJWKS(config.JWKS_URL);

    // Verify JWT signature using remote JWKS
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: config.JWT_ISSUER,
      audience: config.CLIENT_ID,
    });

    if (!payload || typeof payload === 'string') {
      return null;
    }

    return payload as JWTPayload;
  } catch (error) {
    // Log JWT verification errors for debugging
    if (error instanceof Error) {
      console.error('JWT verification error:', error.message);
    } else {
      console.error('JWT verification error:', error);
    }
    return null;
  }
}

/**
 * Check if a token is expired without verifying signature
 */
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
