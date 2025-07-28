'use client';

import { useSuspenseQuery } from '@apollo/client';

import { ClockEditor } from '@/components/music-scheduling/clocks/ClockEditor';
import { GET_MUSIC_CLOCK } from '@/graphql/queries/musicClocks';

interface ClockEditPageProps {
  clockId: string;
}

export const ClockEditPage = ({ clockId }: ClockEditPageProps) => {
  const { data } = useSuspenseQuery(GET_MUSIC_CLOCK, {
    variables: { id: clockId },
  });

  if (!data.musicClock) {
    return <div>Clock not found</div>;
  }

  return <ClockEditor clock={data.musicClock} />;
};