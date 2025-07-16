import { AuthConfig } from './types';

export interface CallbackContext {
  config: AuthConfig;
  getSearchParam: (name: string) => string | null;
  getHeader: (name: string) => string | null;
  createRedirectUrl: (url: string) => string;
  createErrorUrl: (error: string) => string;
  setCookie: (name: string, value: string, options?: any) => void;
}

export interface CallbackResult {
  success: boolean;
  redirectUrl: string;
  setCookieHeaders?: string[];
  error?: string;
}

/**
 * Generic callback handler for OAuth code exchange
 */
export async function handleAuthCallback(context: CallbackContext): Promise<CallbackResult> {
  const { config, getSearchParam, getHeader, createRedirectUrl, createErrorUrl } = context;
  
  const code = getSearchParam('code');
  const returnTo = getSearchParam('returnTo');
  const redirectUri = `${config.CLIENT_CALLBACK_BASE_URL}/auth/callback`;

  if (!code) {
    return {
      success: false,
      redirectUrl: createErrorUrl('missing_code'),
      error: 'Authorization code missing from callback',
    };
  }

  try {
    // Exchange auth code for session
    const response = await fetch(`${config.BASE_URL}${config.VERIFY_CODE_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getHeader('user-agent') || '',
        'X-Forwarded-For': getHeader('x-forwarded-for') || getHeader('x-real-ip') || '',
      },
      body: JSON.stringify({
        code,
        client_id: config.CLIENT_ID,
        redirect_uri: redirectUri,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Auth callback failed:', result.message);
      return {
        success: false,
        redirectUrl: createErrorUrl('auth_failed'),
        error: result.message || 'Authentication failed',
      };
    }

    // Create redirect URL
    const redirectUrl = returnTo 
      ? createRedirectUrl(returnTo)
      : createRedirectUrl('/');

    // Pass through Set-Cookie headers directly from auth service
    const setCookieHeaders = response.headers.getSetCookie?.() || [];

    return {
      success: true,
      redirectUrl,
      setCookieHeaders: setCookieHeaders.length > 0 ? setCookieHeaders : undefined,
    };
  } catch (error) {
    console.error('Auth callback error:', error);
    return {
      success: false,
      redirectUrl: createErrorUrl('server_error'),
      error: error instanceof Error ? error.message : 'Server error',
    };
  }
}