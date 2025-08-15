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
import { NetworkType, MediaType } from '@/graphql/__generated__/graphql';
import { CREATE_NETWORK } from '@/graphql/mutations/createNetwork';
import { UPDATE_NETWORK } from '@/graphql/mutations/updateNetwork';
import { toast } from '@/lib/toast';

// Define the schema for network form
const networkFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  baseUrl: z.string().min(1, 'Base URL is required'),
  imagesUrl: z.string().min(1, 'Images URL is required'),
  logoMediaId: z.string().min(1, 'Logo media is required'),
  logoIconMediaId: z.string().min(1, 'Logo icon media is required'),
  logoSvg: z.string().optional(), // Keep for backward compatibility
  logoSvgCircular: z.string().optional(),
  logoSvgColor: z.string().optional(),
  logoSvgIcon: z.string().optional(), // Keep for backward compatibility
  networkType: z.nativeEnum(NetworkType),
  parentId: z.string().optional(),
  tagline: z.string().optional(),
  cssUrl: z.string().optional(),
  playFormat: z.string().optional(),
  playUrl: z.string().optional(),
});

export type NetworkFormData = z.infer<typeof networkFormSchema>;

export interface NetworkFormProps {
  network?: any; // Use any for now to handle GraphQL query result types
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
        baseUrl: network.baseUrl || '',
        imagesUrl: network.imagesUrl || '',
        logoMediaId: network.logoMedia?.id || '',
        logoIconMediaId: network.logoIconMedia?.id || '',
        logoSvg: network.logoSvg || undefined,
        logoSvgCircular: network.logoSvgCircular || undefined,
        logoSvgColor: network.logoSvgColor || undefined,
        logoSvgIcon: network.logoSvgIcon || undefined,
        networkType: network.networkType || NetworkType.Station,
        parentId: undefined, // parentId is not available in Network type yet
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
    logoMediaId: '',
    logoIconMediaId: '',
    networkType: NetworkType.Station,
  };

  const methods = useForm<NetworkFormData>({
    resolver: zodResolver(networkFormSchema),
    ...(network ? { values: formData } : { defaultValues: defaultFormData }),
  });

  const handleSubmit = (data: NetworkFormData) => {
    // Transform form data to API input format
    const apiInput = {
      ...data,
      logoMediaId: data.logoMediaId || undefined,
      logoIconMediaId: data.logoIconMediaId || undefined,
      // Keep legacy fields for backward compatibility
      logoSvg: data.logoSvg || '',
      logoSvgIcon: data.logoSvgIcon || '',
    };

    if (isEditing) {
      updateNetwork({
        variables: {
          input: {
            id: network.id,
            ...apiInput,
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
          input: apiInput,
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
      name: 'parentId' as const,
      component: 'networkSelector' as const,
      label: 'Parent Network',
      placeholder: 'Select parent network (optional)',
      multiple: false,
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
                key="media-uploads"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
              >
                <DynamicForm 
                  key="logo-media"
                  fields={[
                    {
                      name: 'logoMediaId' as const,
                      component: 'mediaEditor' as const,
                      label: 'Logo',
                      type: MediaType.BrandAsset,
                      multiple: false,
                    },
                    {
                      name: 'logoIconMediaId' as const,
                      component: 'mediaEditor' as const,
                      label: 'Logo Icon',
                      type: MediaType.BrandAsset,
                      multiple: false,
                    },
                  ]}
                />
                <div className="grid grid-cols-1 gap-6">
                  <SvgUploadField
                    name="logoSvgCircular"
                    label="Circular Logo SVG (Legacy)"
                    helperText="Upload a circular version of the logo (optional, legacy field)"
                  />
                  <SvgUploadField
                    name="logoSvgColor"
                    label="Color Logo SVG (Legacy)"
                    helperText="Upload a color version of the logo (optional, legacy field)"
                  />
                </div>
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
