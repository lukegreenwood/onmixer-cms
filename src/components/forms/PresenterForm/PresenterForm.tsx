'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { GetPresenterQuery, MediaType } from '@/graphql/__generated__/graphql';

// Define the schema for presenter form
const presenterFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(1, 'Bio is required'),
  shortBio: z.string().min(1, 'Short bio is required'),
  networkIds: z.array(z.string()).min(1, 'At least one network is required'),
  hidden: z.boolean(),
  picture: z.string().optional(),
  hero: z.string().optional(),
});

export type PresenterFormData = z.infer<typeof presenterFormSchema>;

export interface PresenterFormProps {
  presenterData?: GetPresenterQuery['presenter'];
  onSubmit?: (data: PresenterFormData) => void;
  className?: string;
}

export const PresenterForm = ({
  presenterData,
  onSubmit,
}: PresenterFormProps) => {
  // Transform the GraphQL data to match the form structure when available
  const formData: PresenterFormData | undefined = presenterData
    ? {
        name: presenterData.name || '',
        bio: presenterData.bio || '',
        shortBio: presenterData.shortBio || '',
        hidden: presenterData.hidden,
        networkIds: presenterData.networks?.map((n) => n.id) || [],
        picture: presenterData.picture || '',
        hero: presenterData.hero || '',
      }
    : undefined;

  const defaultFormData: PresenterFormData = {
    name: '',
    bio: '',
    shortBio: '',
    hidden: false,
    networkIds: [],
    picture: '',
    hero: '',
  };

  const methods = useForm<PresenterFormData>({
    resolver: zodResolver(presenterFormSchema),
    ...(presenterData
      ? { values: formData }
      : { defaultValues: defaultFormData }),
  });

  const handleSubmit = (data: PresenterFormData) => {
    onSubmit?.(data);
  };

  // Define the form fields for the left section
  const startSectionFields = [
    [
      {
        component: 'text' as const,
        name: 'name' as const,
        label: 'Name',
        placeholder: 'Enter presenter name',
        required: true,
      },
      {
        component: 'textarea' as const,
        name: 'bio' as const,
        label: 'Bio',
        placeholder: 'Enter presenter bio',
        required: true,
      },
      {
        component: 'textarea' as const,
        name: 'shortBio' as const,
        label: 'Short Bio',
        placeholder: 'Enter short bio',
        required: true,
      },
    ],
    [
      {
        component: 'mediaEditor' as const,
        name: 'picture' as const,
        label: 'Picture',
        multiple: false,
        type: MediaType.Presenter,
      },
      {
        component: 'mediaEditor' as const,
        name: 'hero' as const,
        label: 'Hero Image',
        multiple: false,
        type: MediaType.PresenterHero,
      },
    ],
  ];

  // Define the form fields for the right section
  const endSectionFields = [
    {
      component: 'networkSelector' as const,
      name: 'networkIds' as const,
      label: 'Networks',
      placeholder: 'Select networks',
    },
    {
      component: 'switch' as const,
      name: 'hidden' as const,
      label: 'Hidden',
      helperText:
        'Hidden presenters will not appear on the network website but can still be assigned to shows and episodes',
    },
  ];

  const isDirty = methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <div className="presenter-form">
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
