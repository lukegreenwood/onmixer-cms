'use client';

import { useSuspenseQuery } from '@apollo/client';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@soundwaves/components';
import Link from 'next/link';

import { TrackForm, TrackFormData, PageHeader } from '@/components';
import { GET_TRACK } from '@/graphql/queries';
import { toast } from '@/lib/toast';

export interface TrackEditPageProps {
  id: string;
}

export const TrackEditPage = ({ id }: TrackEditPageProps) => {
  const { data } = useSuspenseQuery(GET_TRACK, { variables: { id } });

  if (!data?.track) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Track not found">
          Please check the URL and try again.
        </Alert>
      </div>
    );
  }

  const handleFormSubmit = (_formData: TrackFormData) => {
    // Since tracks are read-only, we just show a toast
    toast('Track editing is not available - tracks are read-only', 'info');
  };

  return (
    <>
      <PageHeader
        heading={data.track.title}
        subheading={`by ${data.track.artist}`}
        backTo="/tracks"
        headingExtras={
          <>
            <Badge color="red" size="sm">
              #{data.track.id}
            </Badge>
            <Badge color="orange" size="sm">
              {data.track.year}
            </Badge>
          </>
        }
        actions={
          <ButtonGroup variant="tertiary" size="sm">
            <ButtonGroup.Item isIconOnly asChild>
              <Button asChild>
                <Link href={`/tracks/${parseInt(data.track.id) - 1}/edit`}>
                  <ChevronLeftIcon />
                </Link>
              </Button>
            </ButtonGroup.Item>
            <ButtonGroup.Item isIconOnly asChild>
              <Button asChild>
                <Link href={`/tracks/${parseInt(data.track.id) + 1}/edit`}>
                  <ChevronRightIcon />
                </Link>
              </Button>
            </ButtonGroup.Item>
          </ButtonGroup>
        }
      />
      <div className="page-content">
        <TrackForm trackData={data.track} onSubmit={handleFormSubmit} />
      </div>
    </>
  );
};