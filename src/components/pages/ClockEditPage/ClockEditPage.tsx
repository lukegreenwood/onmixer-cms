'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Alert, Button } from '@soundwaves/components';

import { ClockEditor } from '@/components/music-scheduling/clocks/ClockEditor';
import { GET_MUSIC_CLOCK } from '@/graphql/queries/musicClocks';

interface ClockEditPageProps {
  clockId: string;
}

export const ClockEditPage = ({ clockId }: ClockEditPageProps) => {
  const { data, error } = useSuspenseQuery(GET_MUSIC_CLOCK, {
    variables: { id: clockId },
  });

  if (error) {
    return (
      <div className="error-boundary">
        <Alert variant="expanded" color="error" title="Something went wrong">
          <p>Error loading clock edit page</p>
          {process.env.NODE_ENV === 'development' && error && (
            <details className="error-details">
              <summary>Error Details (Development Only)</summary>
              <pre>{error.toString()}</pre>
              <pre>{error.stack}</pre>
            </details>
          )}
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            className="error-boundary__retry"
          >
            Refresh Page
          </Button>
        </Alert>
      </div>
    );
  }

  if (!data.musicClock) {
    return <div>Clock not found</div>;
  }

  return <ClockEditor clock={data.musicClock} />;
};
