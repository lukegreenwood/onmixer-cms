# @soundwaves/client-auth

A reusable authentication library for JWT-based authentication with refresh token support. Platform-agnostic and framework-independent.

## Features

- 🔐 JWT token verification using remote JWKS
- 🔄 Automatic token refresh
- 🍪 Cookie-based token storage support
- 🔗 Generic OAuth callback handler
- 🌐 Platform-agnostic (works with any JS runtime)
- 📦 TypeScript support
- 🧪 Framework-independent

## Installation

```bash
npm install @soundwaves/client-auth
```

## Usage

### Basic Authentication

```typescript
import { authenticateRequest, createAuthContext, createAuthConfig, createLoginRedirectUrl } from '@soundwaves/client-auth';

// Create auth config from environment variables
const config = createAuthConfig({
  BASE_URL: process.env.AUTH_BASE_URL,
  CLIENT_ID: process.env.AUTH_CLIENT_ID,
  CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE,
  AUTH_FRONTEND_URI: process.env.AUTH_FRONTEND_URI,
  JWKS_URL: process.env.AUTH_JWKS_URL,
  JWT_ISSUER: process.env.AUTH_JWT_ISSUER,
});

// Create auth context
const context = createAuthContext(
  config,
  (cookieName) => getCookieValue(cookieName), // Your cookie getter
  (headerName) => getHeaderValue(headerName), // Your header getter
  '/current/path' // Current request path
);

// Authenticate request
const result = await authenticateRequest(context);

if (result.success) {
  if (result.shouldRefresh) {
    // Handle token refresh
    const headers = result.refreshResult?.headers;
    // Apply new cookies from headers
  }
  // Continue with authenticated request
  console.log('User payload:', result.payload);
} else if (result.redirectToLogin) {
  // Redirect to login
  const loginUrl = createLoginRedirectUrl(
    config,
    'https://your-app.com/auth/callback',
    '/current/path'
  );
  console.log('Redirecting to login:', loginUrl);
}
```

### OAuth Callback Handler

```typescript
import { handleAuthCallback, createAuthConfig } from '@soundwaves/client-auth';

// Create auth config
const config = createAuthConfig({
  BASE_URL: process.env.AUTH_BASE_URL,
  CLIENT_ID: process.env.AUTH_CLIENT_ID,
  CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE,
  // ... other config
});

// Handle OAuth callback
const context = {
  config,
  getSearchParam: (name) => new URLSearchParams(window.location.search).get(name),
  getHeader: (name) => '', // Not available in browser
  createRedirectUrl: (url) => new URL(url, config.CLIENT_CALLBACK_BASE_URL).toString(),
  createErrorUrl: (error) => `/auth?error=${error}`,
  setCookie: (name, value, options) => {
    // Browser cookie setting logic
    document.cookie = `${name}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join('; ')}`;
  },
};

const result = await handleAuthCallback(context);

if (result.success) {
  // Apply cookies and redirect
  result.setCookieHeaders?.forEach(cookieHeader => {
    // Parse cookie header for browser (basic implementation)
    const [nameValue] = cookieHeader.split(';');
    const [name, value] = nameValue.split('=');
    if (name && value) {
      document.cookie = `${name.trim()}=${value.trim()}; path=/`;
    }
  });
  window.location.href = result.redirectUrl;
} else {
  // Handle error
  console.error('Auth callback failed:', result.error);
  window.location.href = result.redirectUrl;
}
```

### Next.js Middleware Example

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, createAuthContext, createAuthConfig } from '@soundwaves/client-auth';

export async function middleware(request: NextRequest) {
  const config = createAuthConfig({
    BASE_URL: process.env.AUTH_BASE_URL,
    CLIENT_ID: process.env.AUTH_CLIENT_ID,
    CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE,
    AUTH_FRONTEND_URI: process.env.AUTH_FRONTEND_URI,
    JWKS_URL: process.env.AUTH_JWKS_URL,
    JWT_ISSUER: process.env.AUTH_JWT_ISSUER,
  });
  
  const context = createAuthContext(
    config,
    (name) => request.cookies.get(name)?.value,
    (name) => request.headers.get(name),
    request.nextUrl.pathname
  );

  const result = await authenticateRequest(context);

  if (result.success) {
    if (result.shouldRefresh) {
      // Apply refresh token cookies
      const response = NextResponse.next();
      Object.entries(result.refreshResult?.headers || {}).forEach(([key, value]) => {
        if (key.startsWith('Set-Cookie-')) {
          response.headers.append('Set-Cookie', value);
        }
      });
      return response;
    }
    return NextResponse.next();
  } else if (result.redirectToLogin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Next.js Callback Route Example

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { handleAuthCallback, createAuthConfig } from '@soundwaves/client-auth';

const config = createAuthConfig({
  BASE_URL: process.env.AUTH_BASE_URL,
  CLIENT_ID: process.env.AUTH_CLIENT_ID,
  CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE,
  // ... other config
});

export async function GET(request: NextRequest) {
  const context = {
    config,
    getSearchParam: (name) => request.nextUrl.searchParams.get(name),
    getHeader: (name) => request.headers.get(name),
    createRedirectUrl: (url) => new URL(url, config.CLIENT_CALLBACK_BASE_URL).toString(),
    createErrorUrl: (error) => new URL(`/auth?error=${error}`, config.CLIENT_CALLBACK_BASE_URL).toString(),
    setCookie: () => {}, // Not used - cookies handled via response
  };

  const result = await handleAuthCallback(context);
  const response = NextResponse.redirect(new URL(result.redirectUrl, request.url));

  // Apply cookies to response
  result.setCookieHeaders?.forEach(cookieHeader => {
    response.headers.append('Set-Cookie', cookieHeader);
  });

  return response;
}
```

### Express.js Example

```typescript
import express from 'express';
import { authenticateRequest, createAuthContext, createAuthConfig } from '@soundwaves/client-auth';

const app = express();
const config = createAuthConfig({
  BASE_URL: process.env.AUTH_BASE_URL,
  CLIENT_ID: process.env.AUTH_CLIENT_ID,
  CLIENT_CALLBACK_BASE_URL: process.env.AUTH_CLIENT_CALLBACK_BASE,
  AUTH_FRONTEND_URI: process.env.AUTH_FRONTEND_URI,
  JWKS_URL: process.env.AUTH_JWKS_URL,
  JWT_ISSUER: process.env.AUTH_JWT_ISSUER,
});

app.use(async (req, res, next) => {
  const context = createAuthContext(
    config,
    (name) => req.cookies[name],
    (name) => req.headers[name],
    req.path
  );

  const result = await authenticateRequest(context);

  if (result.success) {
    if (result.shouldRefresh) {
      // Apply refresh token cookies
      Object.entries(result.refreshResult?.headers || {}).forEach(([key, value]) => {
        if (key.startsWith('Set-Cookie-')) {
          res.setHeader('Set-Cookie', value);
        }
      });
    }
    req.user = result.payload;
    next();
  } else if (result.redirectToLogin) {
    res.redirect('/login');
  }
});
```

## API Reference

### Types

```typescript
interface AuthConfig {
  ACCESS_TOKEN_COOKIE_NAME: string;
  REFRESH_TOKEN_COOKIE_NAME: string;
  BASE_URL: string;
  CLIENT_ID: string;
  CLIENT_CALLBACK_BASE_URL: string;
  AUTH_FRONTEND_URI: string;
  JWKS_URL: string;
  JWT_ISSUER: string;
  REFRESH_ENDPOINT: string;
  VERIFY_CODE_ENDPOINT: string;
}

interface AuthContext {
  config: AuthConfig;
  getCookie: (name: string) => string | undefined;
  getHeader: (name: string) => string | undefined;
  pathname: string;
}

interface AuthResult {
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

interface CallbackContext {
  config: AuthConfig;
  getSearchParam: (name: string) => string | null;
  getHeader: (name: string) => string | null;
  createRedirectUrl: (url: string) => string;
  createErrorUrl: (error: string) => string;
  setCookie: (name: string, value: string, options?: any) => void;
}

interface CallbackResult {
  success: boolean;
  redirectUrl: string;
  setCookieHeaders?: string[];
  error?: string;
}
```

### Functions

#### `authenticateRequest(context: AuthContext): Promise<AuthResult>`
Main authentication function that handles token verification and refresh.

#### `createAuthConfig(params: AuthConfigParams): AuthConfig`
Create auth configuration from individual environment variables.

#### `createAuthContext(config, getCookie, getHeader, pathname): AuthContext`
Create an auth context for authentication.

#### `verifyJWT(token: string, config: AuthConfig): Promise<JWTPayload | null>`
Verify a JWT token using remote JWKS.

#### `isTokenExpired(token: string): boolean`
Check if a token is expired without verifying signature.

#### `refreshAccessToken(refreshToken, config, getHeader): Promise<RefreshTokenResponse>`
Refresh access token using refresh token.

#### `handleAuthCallback(context: CallbackContext): Promise<CallbackResult>`
Handle OAuth callback and exchange authorization code for tokens.

#### `createLoginRedirectUrl(config: AuthConfig, callbackUri: string, returnTo?: string): string`
Create login redirect URL for OAuth flow with callback URI and optional return URL.

## Environment Variables

```bash
AUTH_ACCESS_TOKEN_COOKIE_NAME=access_token
AUTH_REFRESH_TOKEN_COOKIE_NAME=refresh_token
AUTH_BASE_URL=https://your-auth-service.com
AUTH_CLIENT_ID=your-client-id
AUTH_CLIENT_CALLBACK_BASE=https://your-app.com
AUTH_FRONTEND_URI=https://your-auth-frontend.com
AUTH_JWKS_URL=https://your-auth-service.com/.well-known/jwks.json
AUTH_JWT_ISSUER=your-auth-service
```

## License

MIT