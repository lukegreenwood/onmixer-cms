'use client';

import { Loading } from '@soundwaves/components';

interface LoadingFallbackProps {
  message?: string;
}

export const LoadingFallback = ({
  message = 'Loading...',
}: LoadingFallbackProps) => {
  return (
    <div className="loading-fallback">
      <Loading />
      <span className="loading-fallback__message">{message}</span>
    </div>
  );
};
