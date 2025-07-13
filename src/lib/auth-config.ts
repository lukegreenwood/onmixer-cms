export const AUTH_CONFIG = {
  ACCESS_TOKEN_COOKIE_NAME:
    process.env.AUTH_ACCESS_TOKEN_COOKIE_NAME || 'access_token',
  REFRESH_TOKEN_COOKIE_NAME:
    process.env.AUTH_REFRESH_TOKEN_COOKIE_NAME || 'refresh_token',
  BASE_URL: process.env.AUTH_BASE_URL || '',
  CLIENT_ID: process.env.AUTH_CLIENT_ID || '',
  CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE || '',
  AUTH_FRONTEND_URI: process.env.AUTH_FRONTEND_URI || '',
  JWKS_URL:
    process.env.AUTH_JWKS_URL || 'http://localhost:4001/.well-known/jwks.json',
  JWT_ISSUER: process.env.AUTH_JWT_ISSUER || 'soundwaves-auth',
  JWT_AUDIENCE: process.env.AUTH_JWT_AUDIENCE || 'soundwaves-clients',
  REFRESH_ENDPOINT: '/refresh-token',
  VERIFY_CODE_ENDPOINT: '/verify-code',
} as const;
