'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { GetSeriesQuery, MediaType } from '@/graphql/__generated__/graphql';

// Define the schema for series form
const seriesFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  fullDesc: z.string().min(1, 'Full description is required'),
  shortDesc: z.string().min(1, 'Short description is required'),
  archived: z.boolean(),
  show: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .refine((val) => val.id !== '', 'Show is required'),
  networkId: z.string().optional(),
  mediaId: z.string().optional(),
});

export type SeriesFormData = z.infer<typeof seriesFormSchema>;

export interface SeriesFormProps {
  seriesData?: GetSeriesQuery['series'];
  onSubmit?: (data: SeriesFormData) => void;
  className?: string;
}

export const SeriesForm = ({ seriesData, onSubmit }: SeriesFormProps) => {
  // Transform the GraphQL data to match the form structure when available
  const formData: SeriesFormData | undefined = seriesData
    ? {
        fullName: seriesData.fullName || '',
        shortName: seriesData.shortName || '',
        fullDesc: seriesData.fullDesc || '',
        shortDesc: seriesData.shortDesc || '',
        archived: seriesData.archived,
        show: seriesData.show
          ? {
              id: seriesData.show.id,
              name: seriesData.show.fullName || seriesData.show.shortName || '',
            }
          : { id: '', name: '' },
        networkId: seriesData.network?.id || '',
        mediaId: seriesData.featuredImage?.id || '',
      }
    : undefined;

  const defaultFormData: SeriesFormData = {
    fullName: '',
    shortName: '',
    fullDesc: '',
    shortDesc: '',
    archived: false,
    show: { id: '', name: '' },
    networkId: '',
    mediaId: '',
  };

  const methods = useForm<SeriesFormData>({
    resolver: zodResolver(seriesFormSchema),
    ...(seriesData ? { values: formData } : { defaultValues: defaultFormData }),
  });

  const handleSubmit = (data: SeriesFormData) => {
    onSubmit?.(data);
  };

  // Define the form fields for the left section
  const startSectionFields = [
    [
      {
        component: 'text' as const,
        name: 'fullName' as const,
        label: 'Full Name',
        placeholder: 'Enter series full name',
        required: true,
      },
      {
        component: 'text' as const,
        name: 'shortName' as const,
        label: 'Short Name',
        placeholder: 'Enter series short name',
        required: true,
      },
      {
        component: 'textarea' as const,
        name: 'fullDesc' as const,
        label: 'Full Description',
        placeholder: 'Enter full description',
        required: true,
      },
      {
        component: 'textarea' as const,
        name: 'shortDesc' as const,
        label: 'Short Description',
        placeholder: 'Enter short description',
        required: true,
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
      component: 'networkSelector' as const,
      name: 'networkId' as const,
      label: 'Network',
      placeholder: 'Select network',
      multiple: false,
    },
    {
      component: 'switch' as const,
      name: 'archived' as const,
      label: 'Archived',
      helperText:
        'Archived series are hidden from public view but episodes can still be created',
    },
  ];

  const isDirty = methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <div className="series-form">
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
