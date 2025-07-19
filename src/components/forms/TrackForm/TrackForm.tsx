'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { EntityEditForm, ActionBar } from '@/components';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { MediaType, GetTrackQuery } from '@/graphql/__generated__/graphql';

const trackFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().optional(),
  year: z.string().optional(),
  genre: z.string().optional(),
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

export const TrackForm = ({ trackData, onSubmit }: TrackFormProps) => {
  const methods = useForm<TrackFormData>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: {
      title: trackData.title,
      artist: trackData.artist,
      album: trackData.album || '',
      year: trackData.year || '',
      genre: trackData.genre?.name || '',
      isrc: trackData.isrc || '',
      label: trackData.label || '',
      copyright: trackData.copyright || '',
      composer: trackData.composer || '',
      publisher: trackData.publisher || '',
      mediaId: trackData.image || '',
      metadata:
        trackData.metadata?.map((meta) => ({
          id: meta.id,
          key: meta.key,
          value: meta.value || '',
        })) || [],
    },
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
      component: 'text' as const,
      name: 'genre' as const,
      label: 'Genre',
      placeholder: 'Enter genre',
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

  // Create a metadata section component
  const MetadataSection = () => (
    <div className="metadata-section">
      <h3>Metadata</h3>
      <div className="metadata-fields">
        {methods.watch('metadata')?.map((item, index) => (
          <div key={index} className="metadata-field">
            <div className="metadata-field__inputs">
              <input
                {...methods.register(`metadata.${index}.key`)}
                placeholder="key"
                className="metadata-key"
              />
              <input
                {...methods.register(`metadata.${index}.value`)}
                placeholder="value"
                className="metadata-value"
              />
            </div>
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => {
                const currentMetadata = methods.getValues('metadata') || [];
                currentMetadata.splice(index, 1);
                methods.setValue('metadata', currentMetadata);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            const currentMetadata = methods.getValues('metadata') || [];
            currentMetadata.push({ key: '', value: '' });
            methods.setValue('metadata', currentMetadata);
          }}
        >
          Add Metadata
        </Button>
      </div>
    </div>
  );

  const isDirty = methods.formState.isDirty;

  const handleSubmit = (data: TrackFormData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="track-form">
        <EntityEditForm
          startSection={<DynamicForm fields={startSectionFields} />}
          endSection={
            <>
              <DynamicForm fields={endSectionFields} />
              <MetadataSection />
            </>
          }
        />

        <ActionBar unsavedChanges={isDirty}>
          {isDirty && (
            <Button variant="tertiary" onClick={() => methods.reset()}>
              Discard
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => methods.handleSubmit(handleSubmit)()}
          >
            Save
          </Button>
        </ActionBar>
      </div>
    </FormProvider>
  );
};
