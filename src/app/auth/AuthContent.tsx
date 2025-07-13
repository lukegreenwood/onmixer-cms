'use client';

import { Alert, Button } from '@soundwaves/components';
import { useRouter } from 'next/navigation';

import { AUTH_CONFIG } from '@/lib/auth-config';

export const AuthContent = ({
  errorMessage,
}: {
  errorMessage: string | null;
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    const authUrl = new URL(AUTH_CONFIG.BASE_URL);
    const redirectUri = `${window.location.origin}/auth/callback`;

    const signInUrl = `${authUrl}/login?${new URLSearchParams({
      client_id: AUTH_CONFIG.CLIENT_ID,
      redirect_uri: redirectUri,
    }).toString()}`;

    router.push(signInUrl);
  };
  return (
    <>
      {errorMessage ? (
        <div className="auth-page__error">
          <Alert variant="expanded" color="error" title="Authentication Error">
            <p>{errorMessage}</p>
            <Button
              variant="primary"
              onClick={handleSignIn}
              className="auth-page__signin-button"
            >
              Try Again
            </Button>
          </Alert>
        </div>
      ) : (
        <div className="auth-page__signin">
          <p className="auth-page__description">
            Please sign in to access the OnMixer CMS.
          </p>
          <Button
            variant="primary"
            onClick={handleSignIn}
            className="auth-page__signin-button"
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
};
