import { AuthConfig, RefreshTokenResponse, HeadersGetter } from './types';

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
  refreshToken: string,
  config: AuthConfig,
  getHeader: HeadersGetter,
  redirectUri?: string,
): Promise<RefreshTokenResponse> {
  try {
    const refreshUrl = `${config.BASE_URL}${config.REFRESH_ENDPOINT}`;
    const refreshBody = {
      refresh_token: refreshToken,
      client_id: config.CLIENT_ID,
      ...(redirectUri && { redirect_uri: redirectUri }),
    };

    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': getHeader('user-agent') || '',
        'X-Forwarded-For':
          getHeader('x-forwarded-for') || getHeader('x-real-ip') || '',
      },
      body: JSON.stringify(refreshBody),
    });

    if (response.ok) {
      // Extract Set-Cookie headers
      const setCookieHeaders = response.headers.getSetCookie?.() || [];
      const headers: Record<string, string> = {};

      setCookieHeaders.forEach((cookie, index) => {
        headers[`Set-Cookie-${index}`] = cookie;
      });

      return {
        success: true,
        headers,
      };
    } else {
      const errorText = await response.text();
      console.error(
        'Token refresh failed:',
        response.status,
        response.statusText,
        'Body:',
        errorText,
      );

      return {
        success: false,
        message: `Token refresh failed: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error('Token refresh network error:', error);
    return {
      success: false,
      message: `Token refresh network error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    };
  }
}
