import { AuthContent } from './AuthContent';

const ERROR_MESSAGES = {
  missing_code: 'Authentication code is missing. Please try signing in again.',
  auth_failed:
    'Authentication failed. Please check your credentials and try again.',
  server_error:
    'Server error occurred during authentication. Please try again later.',
  invalid_token: 'Invalid or expired token. Please sign in again.',
  access_denied:
    'Access denied. You may not have permission to access this application.',
  default: 'An unexpected error occurred. Please try signing in again.',
} as const;

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  const error = params.error as keyof typeof ERROR_MESSAGES | null;

  const getErrorMessage = (errorCode: string | null) => {
    if (!errorCode) return null;
    return (
      ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES] ||
      ERROR_MESSAGES.default
    );
  };

  const errorMessage = getErrorMessage(error);

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__content">
          <h1 className="auth-page__title">Authentication</h1>

          <AuthContent errorMessage={errorMessage} />
        </div>
      </div>
    </div>
  );
}
