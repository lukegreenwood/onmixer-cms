'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod/v4';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { GetEpisodeQuery, MediaType } from '@/graphql/__generated__/graphql';

// Define the schema for episode form
const episodeFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().optional(),
  extraData: z.string().optional(),
  show: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .refine((val) => val.id !== '', 'Show is required'),
  series: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional(),
  presenters: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .min(1, 'At least one presenter is required'),
  networkIds: z.array(z.string()).min(1, 'At least one network is required'),
  mediaId: z.string().min(1, 'Featured image is required'),
});

export type EpisodeFormData = z.infer<typeof episodeFormSchema>;

export interface EpisodeFormProps {
  episodeData?: GetEpisodeQuery['episode'];
  onSubmit?: (data: EpisodeFormData) => void;
  className?: string;
}

export const EpisodeForm = ({ episodeData, onSubmit }: EpisodeFormProps) => {
  // Transform the GraphQL data to match the form structure when available
  const formData: EpisodeFormData | undefined = episodeData
    ? {
        name: episodeData.name || '',
        description: episodeData.description || '',
        duration: episodeData.duration?.raw?.toString() || '',
        extraData: episodeData.extraData || '',
        show: episodeData.show
          ? {
              id: episodeData.show.id,
              name: episodeData.show.shortName || '',
            }
          : { id: '', name: '' },
        series: episodeData.series
          ? {
              id: episodeData.series.id,
              name: episodeData.series.shortName || '',
            }
          : undefined,
        presenters:
          episodeData.presenters?.map((p) => ({
            id: p.id,
            name: p.name,
          })) || [],
        networkIds: episodeData.networks?.map((n) => n.id) || [],
        mediaId: episodeData.featuredImage?.id || '',
      }
    : undefined;

  const defaultFormData: EpisodeFormData = {
    name: '',
    description: '',
    duration: '',
    extraData: '',
    show: { id: '', name: '' },
    series: undefined,
    presenters: [],
    networkIds: [],
    mediaId: '',
  };

  const methods = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeFormSchema),
    ...(episodeData
      ? { values: formData }
      : { defaultValues: defaultFormData }),
  });

  const handleSubmit = (data: EpisodeFormData) => {
    onSubmit?.(data);
  };

  // Define the form fields for the left section
  const startSectionFields = [
    [
      {
        component: 'text' as const,
        name: 'name' as const,
        label: 'Episode Name',
        placeholder: 'Enter episode name',
        required: true,
      },
      {
        component: 'textarea' as const,
        name: 'description' as const,
        label: 'Description',
        placeholder: 'Enter episode description',
        required: true,
      },
      {
        component: 'text' as const,
        name: 'duration' as const,
        label: 'Duration (seconds)',
        placeholder: 'Enter duration in seconds',
      },
      {
        component: 'textarea' as const,
        name: 'extraData' as const,
        label: 'Extra Data',
        placeholder: 'Enter additional data (JSON)',
      },
    ],
    [
      {
        component: 'mediaEditor' as const,
        name: 'mediaId' as const,
        label: 'Featured Image',
        multiple: false,
        type: MediaType.FeaturedImage,
      },
    ],
  ];

  // Define the form fields for the right section
  const endSectionFields = [
    {
      component: 'showSelector' as const,
      name: 'show' as const,
      label: 'Show',
      placeholder: 'Select show',
      required: true,
    },
    {
      component: 'seriesSelector' as const,
      name: 'series' as const,
      label: 'Series',
      placeholder: 'Select series (optional)',
    },
    {
      component: 'presenterSelector' as const,
      name: 'presenters' as const,
      label: 'Presenters',
      placeholder: 'Select presenters',
    },
    {
      component: 'networkSelector' as const,
      name: 'networkIds' as const,
      label: 'Networks',
      placeholder: 'Select networks',
    },
  ];

  const isDirty = methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <div className="episode-form">
        <EntityEditForm
          startSection={startSectionFields.map((fields, index) => (
            <DynamicForm key={index} fields={fields} />
          ))}
          endSection={<DynamicForm fields={endSectionFields} />}
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
