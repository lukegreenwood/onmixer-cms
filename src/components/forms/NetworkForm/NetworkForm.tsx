'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import { SvgUploadField } from '@/components/DynamicForm/fields/SvgUploadField';
import { Network, NetworkType } from '@/graphql/__generated__/graphql';
import { CREATE_NETWORK } from '@/graphql/mutations/createNetwork';
import { UPDATE_NETWORK } from '@/graphql/mutations/updateNetwork';
import { toast } from '@/lib/toast';

// Define the schema for network form
const networkFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  baseUrl: z.string().min(1, 'Base URL is required'),
  imagesUrl: z.string().min(1, 'Images URL is required'),
  logoSvg: z.string().min(1, 'Logo SVG is required'),
  logoSvgCircular: z.string().optional(),
  logoSvgColor: z.string().optional(),
  logoSvgIcon: z.string().min(1, 'Logo SVG Icon is required'),
  networkType: z.nativeEnum(NetworkType),
  tagline: z.string().optional(),
  cssUrl: z.string().optional(),
  playFormat: z.string().optional(),
  playUrl: z.string().optional(),
});

export type NetworkFormData = z.infer<typeof networkFormSchema>;

export interface NetworkFormProps {
  network?: Network;
  onSubmit?: (data: NetworkFormData) => void;
  className?: string;
}

export const NetworkForm = ({ network, onSubmit }: NetworkFormProps) => {
  const router = useRouter();
  const isEditing = !!network;

  // Transform the GraphQL data to match the form structure when available
  const formData: NetworkFormData | undefined = network
    ? {
        name: network.name,
        code: network.code,
        baseUrl: network.baseUrl,
        imagesUrl: network.imagesUrl,
        logoSvg: network.logoSvg,
        logoSvgCircular: network.logoSvgCircular || undefined,
        logoSvgColor: network.logoSvgColor || undefined,
        logoSvgIcon: network.logoSvgIcon,
        networkType: network.networkType,
        tagline: network.tagline || undefined,
        cssUrl: network.cssUrl || undefined,
        playFormat: network.playFormat || undefined,
        playUrl: network.playUrl || undefined,
      }
    : undefined;

  const [createNetwork, { loading: createLoading }] =
    useMutation(CREATE_NETWORK);
  const [updateNetwork, { loading: updateLoading }] =
    useMutation(UPDATE_NETWORK);

  const defaultFormData: NetworkFormData = {
    name: '',
    code: '',
    baseUrl: '',
    imagesUrl: '',
    logoSvg: '',
    logoSvgIcon: '',
    networkType: NetworkType.Station,
  };

  const methods = useForm<NetworkFormData>({
    resolver: zodResolver(networkFormSchema),
    ...(network ? { values: formData } : { defaultValues: defaultFormData }),
  });

  const handleSubmit = (data: NetworkFormData) => {
    if (isEditing) {
      updateNetwork({
        variables: {
          input: {
            id: network.id,
            ...data,
          },
        },
        onCompleted: (result) => {
          if (result.updateNetwork.success) {
            toast('Network updated successfully', 'success');
            router.push(`/networks/${network.code}`);
          } else {
            toast(
              result.updateNetwork.message || 'Failed to update network',
              'error',
            );
          }
        },
        onError: () => {
          toast('Failed to update network', 'error');
        },
      });
    } else {
      createNetwork({
        variables: {
          input: data,
        },
        onCompleted: (result) => {
          if (result.createNetwork.success) {
            toast('Network created successfully', 'success');
            router.push(`/networks/${data.code}`);
          } else {
            toast(
              result.createNetwork.message || 'Failed to create network',
              'error',
            );
          }
        },
        onError: () => {
          toast('Failed to create network', 'error');
        },
      });
    }

    if (onSubmit) {
      onSubmit(data);
    }
  };

  const fields = [
    {
      name: 'name' as const,
      component: 'text' as const,
      label: 'Network Name',
      placeholder: 'Enter network name',
      required: true,
    },
    {
      name: 'code' as const,
      component: 'text' as const,
      label: 'Network Code',
      placeholder: 'Enter network code (e.g., FM)',
      required: true,
    },
    {
      name: 'baseUrl' as const,
      component: 'text' as const,
      label: 'Base URL',
      placeholder: 'Enter base URL (e.g., /fm)',
      required: true,
    },
    {
      name: 'imagesUrl' as const,
      component: 'text' as const,
      label: 'Images URL',
      placeholder: 'Enter images URL',
      required: true,
    },
    {
      name: 'networkType' as const,
      component: 'radioGroup' as const,
      label: 'Network Type',
      options: Object.values(NetworkType).map((type) => ({
        label: type,
        value: type,
      })),
      required: true,
    },
    {
      name: 'tagline' as const,
      component: 'text' as const,
      label: 'Tagline',
      placeholder: 'Enter tagline (optional)',
    },
    {
      name: 'cssUrl' as const,
      component: 'text' as const,
      label: 'CSS URL',
      placeholder: 'Enter CSS URL (optional)',
    },
    {
      name: 'playFormat' as const,
      component: 'text' as const,
      label: 'Play Format',
      placeholder: 'Enter play format (optional)',
    },
    {
      name: 'playUrl' as const,
      component: 'text' as const,
      label: 'Play URL',
      placeholder: 'Enter play URL (optional)',
    },
  ];

  const isDirty = methods.formState.isDirty;

  return (
    <div className="page-content">
      <FormProvider {...methods}>
        <div className="network-form">
          <EntityEditForm
            startSection={[
              <DynamicForm key="fields" fields={fields} />,
              <div
                key="svg-uploads"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
              >
                <SvgUploadField
                  name="logoSvg"
                  label="Logo SVG"
                  required
                  helperText="Upload the main logo SVG"
                />
                <SvgUploadField
                  name="logoSvgIcon"
                  label="Logo SVG Icon"
                  required
                  helperText="Upload the icon version of the logo SVG"
                />
                <SvgUploadField
                  name="logoSvgCircular"
                  label="Circular Logo SVG"
                  helperText="Upload a circular version of the logo (optional)"
                />
                <SvgUploadField
                  name="logoSvgColor"
                  label="Color Logo SVG"
                  helperText="Upload a color version of the logo (optional)"
                />
              </div>,
            ]}
            endSection={<div />}
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
              disabled={createLoading || updateLoading}
            >
              {isEditing ? 'Update Network' : 'Create Network'}
            </Button>
          </ActionBar>
        </div>
      </FormProvider>
    </div>
  );
};
