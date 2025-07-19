import { AuthContext, JWTPayload } from './types';
import { verifyJWT, isTokenExpired } from './jwt';
import { getAuthTokensFromContext } from './tokens';
import { refreshAccessToken } from './refresh';

export interface AuthResult {
  success: boolean;
  payload?: JWTPayload | null;
  shouldRefresh?: boolean;
  refreshResult?: {
    success: boolean;
    headers?: Record<string, string>;
    message?: string;
  };
  redirectToLogin?: boolean;
  error?: string;
}

/**
 * Main authentication function that handles token verification and refresh
 */
export async function authenticateRequest(context: AuthContext): Promise<AuthResult> {
  const { accessToken, refreshToken } = getAuthTokensFromContext(context);

  // If no access token, redirect to login
  if (!accessToken) {
    return {
      success: false,
      redirectToLogin: true,
      error: 'No access token provided',
    };
  }

  // Verify the JWT token
  const payload = await verifyJWT(accessToken, context.config);

  if (payload) {
    // Token is valid, proceed with the request
    return {
      success: true,
      payload,
    };
  }

  // Token is expired or invalid, try to refresh if refresh token exists
  if (refreshToken) {
    console.log('Access token expired, attempting refresh for:', context.pathname);

    // Check if refresh token is expired before attempting refresh
    if (isTokenExpired(refreshToken)) {
      console.log('Refresh token is also expired, redirecting to login');
      return {
        success: false,
        redirectToLogin: true,
        error: 'Refresh token is expired',
      };
    }

    // Construct redirect URI for refresh token request
    const redirectUri = new URL('/auth/callback', context.config.CLIENT_CALLBACK_BASE_URL).toString();
    
    const refreshResult = await refreshAccessToken(
      refreshToken,
      context.config,
      context.getHeader,
      redirectUri,
    );

    if (refreshResult.success) {
      return {
        success: true,
        shouldRefresh: true,
        refreshResult,
        payload: null, // Will be verified after refresh
      };
    } else {
      console.error('Token refresh failed:', refreshResult.message);
      return {
        success: false,
        redirectToLogin: true,
        error: refreshResult.message || 'Token refresh failed',
      };
    }
  } else {
    console.log('No refresh token available, redirecting to login');
    return {
      success: false,
      redirectToLogin: true,
      error: 'No refresh token available',
    };
  }
}