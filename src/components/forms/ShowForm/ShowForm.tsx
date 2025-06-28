'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { GetShowQuery, MediaType } from '@/graphql/__generated__/graphql';

// Define the schema for show form
const showFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  shortName: z.string().min(1, 'Short name is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  presenters: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .min(1, 'At least one presenter is required'),
  networkIds: z.array(z.string()).min(1, 'At least one network is required'),
  visibleOnSite: z.boolean(),
  mediaId: z.string().min(1, 'Media is required'),
});

export type ShowFormData = z.infer<typeof showFormSchema>;

export interface ShowFormProps {
  showData?: GetShowQuery['show'];
  onSubmit?: (data: ShowFormData) => void;
  className?: string;
}

export const ShowForm = ({ showData, onSubmit }: ShowFormProps) => {
  // Transform the GraphQL data to match the form structure when available
  const formData: ShowFormData | undefined = showData
    ? {
        name: showData.fullName || '',
        description: showData.fullDesc || '',
        shortName: showData.shortName || '',
        shortDescription: showData.shortDesc || '',
        visibleOnSite: !showData.hidden,
        presenters:
          showData.presenters?.map((p) => ({
            id: p.id,
            name: p.name,
          })) || [],
        networkIds: showData.networks?.map((n) => n.id) || [],
        mediaId: showData.featuredImage?.id || '',
      }
    : undefined;

  const defaultFormData: ShowFormData = {
    name: '',
    description: '',
    shortName: '',
    shortDescription: '',
    visibleOnSite: true,
    presenters: [],
    networkIds: [],
    mediaId: '',
  };

  const methods = useForm<ShowFormData>({
    resolver: zodResolver(showFormSchema),
    ...(showData ? { values: formData } : { defaultValues: defaultFormData }),
  });

  const handleSubmit = (data: ShowFormData) => {
    onSubmit?.(data);
  };

  // Define the form fields for the left section
  const startSectionFields = [
    [
      {
        component: 'text' as const,
        name: 'name' as const,
        label: 'Name',
        placeholder: 'Enter show name',
        required: true,
      },
      {
        component: 'textarea' as const,
        name: 'description' as const,
        label: 'Description',
        placeholder: 'Enter show description',
        required: true,
      },
      {
        component: 'text' as const,
        name: 'shortName' as const,
        label: 'Short Name',
        placeholder: 'Enter short name',
      },
      {
        component: 'textarea' as const,
        name: 'shortDescription' as const,
        label: 'Short Description',
        placeholder: 'Enter short description',
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
    {
      component: 'switch' as const,
      name: 'visibleOnSite' as const,
      label: 'Visible on site',
      helperText:
        'Shows not visible can still have episodes and be scheduled they just wont be indexed on the networks website',
    },
  ];

  const isDirty = methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <div className="show-form">
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
