// Types
export type {
  JWTPayload,
  AuthConfig,
  AuthTokens,
  RefreshTokenResponse,
  CookieGetter,
  HeadersGetter,
  AuthContext,
} from './types';

// JWT functions
export { verifyJWT, isTokenExpired } from './jwt';

// Token functions
export { getAuthTokens, getAuthTokensFromContext } from './tokens';

// Refresh functions
export { refreshAccessToken } from './refresh';

// Main auth function
export { authenticateRequest } from './auth';
export type { AuthResult } from './auth';

// Callback functions
export { handleAuthCallback } from './callback';
export type { CallbackContext, CallbackResult } from './callback';

// Utility functions
export { createAuthContext, createAuthConfig, createLoginRedirectUrl } from './utils';