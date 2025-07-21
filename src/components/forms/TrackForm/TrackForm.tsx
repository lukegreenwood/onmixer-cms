'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CloseIcon } from '@soundwaves/components';
import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { EntityEditForm, ActionBar } from '@/components';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { TextField } from '@/components/DynamicForm/fields';
import {
  MediaType,
  GetTrackQuery,
  SearchMusicBrainzQuery,
} from '@/graphql/__generated__/graphql';

const trackFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().optional(),
  year: z.string().optional(),
  genreId: z.string().optional(),
  isrc: z.string().optional(),
  label: z.string().optional(),
  copyright: z.string().optional(),
  composer: z.string().optional(),
  publisher: z.string().optional(),
  mediaId: z.string().optional(),
  metadata: z
    .array(
      z.object({
        id: z.string().optional(),
        key: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
});

export type TrackFormData = z.infer<typeof trackFormSchema>;

export interface TrackFormProps {
  trackData: NonNullable<GetTrackQuery['track']>;
  onSubmit: (data: TrackFormData) => void;
}

export interface TrackFormRef {
  applyMusicBrainzData: (
    recording: SearchMusicBrainzQuery['searchMusicBrainz'][0],
    release: SearchMusicBrainzQuery['searchMusicBrainz'][0]['releases'][0],
  ) => void;
}

export const TrackForm = forwardRef<TrackFormRef, TrackFormProps>(
  (props, ref) => {
    const { trackData, onSubmit } = props;

    const form = useForm<TrackFormData>({
      resolver: zodResolver(trackFormSchema),
      defaultValues: {
        title: trackData.title,
        artist: trackData.artist,
        album: trackData.album || '',
        year: trackData.year || '',
        genreId: trackData.genre?.id || '',
        isrc: trackData.isrc || '',
        label: trackData.label || '',
        copyright: trackData.copyright || '',
        composer: trackData.composer || '',
        publisher: trackData.publisher || '',
        mediaId: trackData.image || '',
        metadata: [
          ...(trackData.metadata?.map((meta) => ({
            id: meta.id,
            key: meta.key,
            value: meta.value || '',
          })) || []),
          // Always start with an empty row
          { key: '', value: '' },
        ],
      },
    });

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: 'metadata',
    });

    const startSectionFields = [
      {
        component: 'text' as const,
        name: 'title' as const,
        label: 'Title',
        required: true,
        placeholder: 'Enter track title',
      },
      {
        component: 'text' as const,
        name: 'artist' as const,
        label: 'Artist',
        required: true,
        placeholder: 'Enter artist name',
      },
      {
        component: 'text' as const,
        name: 'album' as const,
        label: 'Album',
        placeholder: 'Enter album name',
      },
      {
        component: 'text' as const,
        name: 'year' as const,
        label: 'Year',
        placeholder: 'Enter year',
      },
      {
        component: 'genreSelector' as const,
        name: 'genreId' as const,
        label: 'Genre',
        placeholder: 'Select or create a genre...',
      },
      {
        component: 'text' as const,
        name: 'isrc' as const,
        label: 'ISRC',
        placeholder: 'Enter ISRC code',
      },
      {
        component: 'text' as const,
        name: 'label' as const,
        label: 'Label',
        placeholder: 'Enter record label',
      },
      {
        component: 'text' as const,
        name: 'copyright' as const,
        label: 'Copyright (p-line)',
        placeholder: 'Enter copyright information',
      },
      {
        component: 'text' as const,
        name: 'composer' as const,
        label: 'Songwriters',
        placeholder: 'Enter songwriter names',
      },
      {
        component: 'text' as const,
        name: 'publisher' as const,
        label: 'Publisher',
        placeholder: 'Enter publisher name',
      },
    ];

    // Define the form fields for the right section (image editor)
    const endSectionFields = [
      {
        component: 'mediaEditor' as const,
        name: 'mediaId' as const,
        label: 'Image',
        type: MediaType.TrackArt,
        multiple: false,
      },
    ];

    const handleMetadataFieldInteraction = useCallback(
      (index: number) => {
        const isLastIndex = index === fields.length - 1;
        if (isLastIndex) {
          append({ key: '', value: '' });
        }
      },
      [fields.length, append],
    );

    const isDirty = form.formState.isDirty;

    const handleSubmit = (data: TrackFormData) => {
      // Filter out empty metadata entries before submitting
      const filteredData = {
        ...data,
        metadata:
          data.metadata?.filter(
            (meta) => meta.key.trim() !== '' && meta.value.trim() !== '',
          ) || [],
      };
      onSubmit(filteredData);
    };

    // Function to map MusicBrainz data to form fields and metadata
    const applyMusicBrainzData = useCallback(
      (
        recording: SearchMusicBrainzQuery['searchMusicBrainz'][0],
        release: SearchMusicBrainzQuery['searchMusicBrainz'][0]['releases'][0],
      ) => {
        // Map basic fields
        form.setValue('title', recording.title);
        form.setValue('artist', recording.artist);
        form.setValue('album', release.album);
        form.setValue('year', release.year?.toString() || '');
        form.setValue('isrc', recording.isrc || '');
        form.setValue('label', release.label || '');

        // Note: MusicBrainz doesn't provide genre data, so we don't update the genre field

        // Create metadata array based on the mapping table
        const metadata = [];

        // Add release date
        if (release.date) {
          metadata.push({ key: 'release_date', value: release.date });
        }

        // Add album artist (same as artist for most cases)
        metadata.push({ key: 'album_artist', value: recording.artist });

        // Add artist sort order
        if (recording.artistSortOrder) {
          metadata.push({
            key: 'album_artist_sort_order',
            value: recording.artistSortOrder,
          });
          metadata.push({
            key: 'performer_sort_order',
            value: recording.artistSortOrder,
          });
        }

        // Add barcode
        if (release.barcode) {
          metadata.push({ key: 'barcode', value: release.barcode });
        }

        // Add ISRC to metadata as well
        if (recording.isrc) {
          metadata.push({ key: 'isrc', value: recording.isrc });
        }

        // Add MusicBrainz IDs
        if (recording.artistId) {
          metadata.push({ key: 'mbz_artist_id', value: recording.artistId });
        }
        if (recording.recordingId) {
          metadata.push({
            key: 'mbz_recording_id',
            value: recording.recordingId,
          });
        }
        if (release.releaseArtistId) {
          metadata.push({
            key: 'mbz_release_artist_id',
            value: release.releaseArtistId,
          });
        }
        if (release.releaseGroupId) {
          metadata.push({
            key: 'mbz_release_group_id',
            value: release.releaseGroupId,
          });
        }
        if (release.releaseId) {
          metadata.push({ key: 'mbz_release_id', value: release.releaseId });
        }
        if (release.trackId) {
          metadata.push({ key: 'mbz_track_id', value: release.trackId });
        }

        // Add original release date
        if (release.originalDate) {
          metadata.push({
            key: 'original_release_date',
            value: release.originalDate,
          });
        }

        // Add original year
        if (release.year) {
          metadata.push({
            key: 'originalyear',
            value: release.year.toString(),
          });
        }

        // Add release country
        if (release.country) {
          metadata.push({ key: 'release_country', value: release.country });
        }

        // Add release type
        if (release.releaseType) {
          metadata.push({ key: 'mbz_album_type', value: release.releaseType });
        }

        // Add dynamic fields from MusicBrainz
        if (recording.dynamicFields) {
          recording.dynamicFields.forEach((field) => {
            if (field.key && field.value) {
              metadata.push({ key: field.key, value: field.value });
            }
          });
        }

        // Set the metadata in the form
        form.setValue('metadata', metadata);

        // Mark form as dirty to enable save button
        form.trigger();
      },
      [form],
    );

    // Expose the applyMusicBrainzData function via ref
    useImperativeHandle(
      ref,
      () => ({
        applyMusicBrainzData,
      }),
      [applyMusicBrainzData],
    );

    return (
      <FormProvider {...form}>
        <div className="track-form">
          <EntityEditForm
            startSection={[
              <DynamicForm key="startSection" fields={startSectionFields} />,
            ]}
            endSection={[
              <DynamicForm key="endSection" fields={endSectionFields} />,
              <div key="metadataSection" className="metadata-section">
                <h3 className="metadata-section__header">Metadata</h3>
                <div className="metadata-section__fields">
                  <div className="metadata-section__row metadata-section__row--header">
                    <p>Key</p>
                    <p>Value</p>
                    <div className="metadata-section__row-placeholder" />
                  </div>
                  {fields.map((field, index) => {
                    const isLastRow = index === fields.length - 1;
                    const key = form.watch(`metadata.${index}.key`);
                    const value = form.watch(`metadata.${index}.value`);
                    const isEmptyRow =
                      (!key || key.trim() === '') &&
                      (!value || value.trim() === '');
                    const showRemoveButton = !(isLastRow && isEmptyRow);

                    return (
                      <div key={field.id} className="metadata-section__row">
                        <TextField
                          name={`metadata.${index}.key` as const}
                          aria-label="Key"
                          placeholder="key"
                          onMouseDown={() =>
                            handleMetadataFieldInteraction(index)
                          }
                        />
                        <TextField
                          name={`metadata.${index}.value` as const}
                          aria-label="Value"
                          placeholder="value"
                        />
                        <div className="metadata-section__row-actions">
                          {showRemoveButton ? (
                            <Button
                              variant="transparent"
                              size="sm"
                              onClick={() => remove(index)}
                              isIconOnly
                            >
                              <CloseIcon />
                            </Button>
                          ) : (
                            <div className="metadata-section__row-placeholder" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>,
            ]}
          />

          <ActionBar unsavedChanges={isDirty}>
            {isDirty && (
              <Button variant="tertiary" onClick={() => form.reset()}>
                Discard
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => form.handleSubmit(handleSubmit)()}
            >
              Save
            </Button>
          </ActionBar>
        </div>
      </FormProvider>
    );
  },
);

TrackForm.displayName = 'TrackForm';
