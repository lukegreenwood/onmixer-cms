'use client';

import { useSuspenseQuery, useMutation } from '@apollo/client';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@soundwaves/components';
import Link from 'next/link';
import React, { useState, useCallback, useRef } from 'react';

import { MusicBrainzSearchModal } from '@/blocks/MusicBrainzSearchModal';
import {
  TrackForm,
  TrackFormData,
  PageHeader,
  TrackFormRef,
} from '@/components';
import type { SearchMusicBrainzQuery } from '@/graphql/__generated__/graphql';
import { UPDATE_TRACK } from '@/graphql/mutations/updateTrack';
import { UPDATE_TRACK_METADATA } from '@/graphql/mutations/updateTrackMetadata';
import { GET_TRACK } from '@/graphql/queries';
import { toast } from '@/lib/toast';

export interface TrackEditPageProps {
  id: string;
}

export const TrackEditPage = ({ id }: TrackEditPageProps) => {
  const { data, refetch } = useSuspenseQuery(GET_TRACK, { variables: { id } });
  const [updateTrack] = useMutation(UPDATE_TRACK);
  const [updateTrackMetadata] = useMutation(UPDATE_TRACK_METADATA);
  const [musicBrainzModal, setMusicBrainzModal] = useState(false);
  const trackFormRef = useRef<TrackFormRef>(null);

  const handleMusicBrainzSearch = useCallback(() => {
    setMusicBrainzModal(true);
  }, []);

  const handleMusicBrainzSelect = useCallback(
    (
      recording: SearchMusicBrainzQuery['searchMusicBrainz'][0],
      release: SearchMusicBrainzQuery['searchMusicBrainz'][0]['releases'][0],
    ) => {
      if (trackFormRef.current) {
        trackFormRef.current.applyMusicBrainzData(recording, release);
      }
      setMusicBrainzModal(false);
    },
    [],
  );

  const handleCloseMusicBrainz = useCallback(() => {
    setMusicBrainzModal(false);
  }, []);

  if (!data?.track) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Track not found">
          Please check the URL and try again.
        </Alert>
      </div>
    );
  }

  const handleFormSubmit = (formData: TrackFormData) => {
    // Update basic track fields first
    updateTrack({
      variables: {
        input: {
          id: id,
          title: formData.title,
          artist: formData.artist,
          album: formData.album || null,
          year: formData.year || null,
          genre: formData.genre || null,
          isrc: formData.isrc || null,
          label: formData.label || null,
          copyright: formData.copyright || null,
          composer: formData.composer || null,
          publisher: formData.publisher || null,
          image: formData.mediaId || null,
        },
      },
      onCompleted: (trackResult) => {
        if (!trackResult.updateTrack?.success) {
          toast(
            trackResult.updateTrack?.message || 'Failed to update track',
            'error',
          );
          return;
        }

        // Update metadata separately (always call to handle deletions)
        updateTrackMetadata({
          variables: {
            input: {
              trackId: id,
              metadata: (formData.metadata || []).map((meta) => ({
                id: meta.id || undefined,
                key: meta.key,
                value: meta.value,
              })),
            },
          },
          onCompleted: (metadataResult) => {
            if (!metadataResult.updateTrackMetadata?.success) {
              toast(
                metadataResult.updateTrackMetadata?.message ||
                  'Failed to update metadata',
                'error',
              );
              return;
            }

            toast('Track updated successfully', 'success');
            refetch();
          },
          onError: (error) => {
            console.error('Failed to update metadata:', error);
            toast('Failed to update metadata', 'error');
          },
        });
      },
      onError: (error) => {
        console.error('Failed to update track:', error);
        toast('Failed to update track', 'error');
      },
    });
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
          <>
            <Button
              onClick={handleMusicBrainzSearch}
              variant="tertiary"
              size="sm"
            >
              Enrich
            </Button>
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
          </>
        }
      />
      <div className="page-content">
        <TrackForm
          trackData={data.track}
          onSubmit={handleFormSubmit}
          ref={trackFormRef}
        />
      </div>

      <MusicBrainzSearchModal
        isOpen={musicBrainzModal}
        onClose={handleCloseMusicBrainz}
        onSelect={handleMusicBrainzSelect}
        initialValues={{
          artist: data.track.artist,
          title: data.track.title,
          album: data.track.album || undefined,
        }}
      />
    </>
  );
};
