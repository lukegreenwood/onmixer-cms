'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Button } from '@soundwaves/components';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/blocks/PageHeader';
import { EditIcon } from '@/components/icons';
import { ClockPreview } from '@/components/music-scheduling/clocks/ClockPreview';
import { GET_MUSIC_CLOCK } from '@/graphql/queries/musicClocks';
import { useNetwork } from '@/hooks';

interface ClockDetailPageProps {
  clockId: string;
}

export const ClockDetailPage = ({ clockId }: ClockDetailPageProps) => {
  const { currentNetwork } = useNetwork();
  const router = useRouter();

  const { data } = useSuspenseQuery(GET_MUSIC_CLOCK, {
    variables: { id: clockId },
  });

  if (!data.musicClock) {
    return <div>Clock not found</div>;
  }

  const clock = data.musicClock;

  return (
    <div className="clock-detail-page">
      <PageHeader
        heading={clock.name}
        subheading={clock.description || 'Music clock details and timeline'}
        backTo={`/networks/${currentNetwork?.code}/music-scheduling/clocks`}
        actions={
          <Button
            variant="primary"
            onClick={() => router.push(`/networks/${currentNetwork?.code}/music-scheduling/clocks/${clockId}/edit`)}
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Edit Clock
          </Button>
        }
      />

      <ClockPreview clock={clock} />
    </div>
  );
};