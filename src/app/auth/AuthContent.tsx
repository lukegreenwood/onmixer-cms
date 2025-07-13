'use client';

import { Alert, Button } from '@soundwaves/components';
import { useRouter } from 'next/navigation';

export const AuthContent = ({
  errorMessage,
}: {
  errorMessage: string | null;
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    // going back to home page will trigger the middleware to redirect to auth
    router.push(`/`);
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
