# JWT Authentication Implementation

This implementation provides JWT cookie verification using JOSE library with automatic token refresh functionality.

## Features

- **JWT Verification**: Uses JOSE library with remote JWKS for secure JWT signature verification
- **Token Expiration Check**: Automatically checks if JWT tokens are expired
- **Automatic Token Refresh**: Attempts to refresh expired access tokens using refresh tokens
- **Cookie Management**: Secure cookie handling for access and refresh tokens
- **Middleware Integration**: Seamless integration with Next.js middleware
- **Key Rotation**: Automatic handling of key rotation through JWKS

## Files

### `src/lib/auth-config.ts`

Configuration file containing all auth-related constants and environment variables.

### `src/lib/auth.ts`

Core authentication utilities:

- `verifyJWT()`: Decodes and verifies JWT tokens, checks expiration
- `isTokenExpired()`: Checks if a JWT token is expired without signature verification
- `getAuthCookies()`: Extracts auth cookies from requests
- `setAuthCookies()`: Forwards all cookies from auth service responses
- `clearAuthCookies()`: Clears auth cookies

### `middleware.ts`

Updated Next.js middleware that:

1. Extracts JWT tokens from cookies
2. Verifies token validity and expiration
3. Attempts token refresh if expired (forwards all cookies from auth service)
4. Checks refresh token expiration before attempting refresh
5. Redirects to login if authentication fails

### `src/app/auth/callback/route.ts`

Updated auth callback that uses the new auth utilities to set cookies.

## Environment Variables

Required environment variables:

```env
AUTH_ACCESS_TOKEN_COOKIE_NAME=access_token
AUTH_REFRESH_TOKEN_COOKIE_NAME=refresh_token
AUTH_BASE_URL=https://your-auth-service.com
AUTH_CLIENT_ID=your-client-id
AUTH_JWKS_URL=https://your-auth-service.com/.well-known/jwks.json
AUTH_JWT_ISSUER=soundwaves-auth
```

## Usage

The middleware automatically handles JWT verification for all protected routes. The flow is:

1. **Request comes in** → Middleware extracts JWT from cookies
2. **JWT is valid** → Request proceeds normally
3. **JWT is expired** → Middleware checks if refresh token is valid
4. **Refresh token valid** → Middleware calls `/refresh-token` endpoint
5. **Refresh succeeds** → New cookies are forwarded transparently to user
6. **Refresh fails** → User is redirected to login

## Token Refresh Flow

When an access token expires, the middleware automatically:

1. **Validates refresh token**: Checks if refresh token is not expired
2. **Calls auth service**: Makes POST request to `${AUTH_BASE_URL}/refresh-token`
3. **Forwards cookies**: All cookies from the auth service response are forwarded to the user
4. **Transparent experience**: User continues their session without interruption
5. **Fallback**: If refresh fails, user is redirected to login page

## Security Features

- **HttpOnly Cookies**: Prevents XSS attacks
- **Secure Cookies**: Only sent over HTTPS in production
- **SameSite**: Protects against CSRF attacks
- **Token Expiration**: Automatic expiration checking
- **Refresh Token Rotation**: Secure token refresh mechanism

## Production Considerations

The implementation now uses proper JWT signature verification with remote JWKS (JSON Web Key Set). This provides:

1. **Automatic Key Rotation**: JWKS automatically handles key rotation from the auth service
2. **Signature Verification**: Full JWT signature verification using the auth service's public keys
3. **Security**: Prevents token tampering and ensures tokens are issued by the trusted auth service

## JWT Verification with Remote JWKS

The current implementation uses:

```typescript
import { jwtVerify, createRemoteJWKSet } from 'jose';

// Create remote JWKS for JWT verification
const JWKS = createRemoteJWKSet(new URL(AUTH_CONFIG.JWKS_URL));

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    // Verify JWT signature using remote JWKS
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: AUTH_CONFIG.JWT_ISSUER,
      audience: AUTH_CONFIG.CLIENT_ID, // Validates that JWT was issued for this client
    });

    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}
```

**Security Features:**

- **Issuer Validation**: Ensures tokens are issued by the trusted auth service
- **Audience Validation**: Ensures tokens are intended for this specific client application
- **Signature Verification**: Prevents token tampering using remote JWKS
- **Automatic Key Rotation**: JWKS handles key rotation automatically
