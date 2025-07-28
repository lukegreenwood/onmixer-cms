'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { Card } from '@/components/blocks/Card/Card';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { PageHeader } from '@/components/blocks/PageHeader';
import { ClockIcon } from '@/components/icons';
import { CREATE_MUSIC_CLOCK_TEMPLATE } from '@/graphql/mutations/musicClockTemplates';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

const templateFormSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  description: z.string().optional(),
  isDefault: z.boolean().optional(),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

interface ClockTemplateCreatePageProps {
  networkCode: string;
}

export const ClockTemplateCreatePage = ({ networkCode }: ClockTemplateCreatePageProps) => {
  const router = useRouter();
  const { currentNetwork } = useNetwork();

  const [createTemplate, { loading: createLoading }] = useMutation(CREATE_MUSIC_CLOCK_TEMPLATE);

  const methods = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: '',
      description: '',
      isDefault: false,
    },
  });

  const handleSubmit = async (data: TemplateFormData) => {
    if (!currentNetwork?.id) {
      toast('Network not found', 'error');
      return;
    }

    try {
      const result = await createTemplate({
        variables: {
          input: {
            ...data,
            networkId: currentNetwork.id,
          },
        },
      });

      if (result.data?.createMusicClockTemplate?.success) {
        toast('Template created successfully', 'success');
        const templateId = result.data.createMusicClockTemplate.template?.id;
        if (templateId) {
          router.push(`/networks/${networkCode}/music-scheduling/templates/${templateId}/edit`);
        } else {
          router.push(`/networks/${networkCode}/music-scheduling/templates`);
        }
      } else {
        toast(result.data?.createMusicClockTemplate?.message || 'Failed to create template', 'error');
      }
    } catch (error) {
      console.error('Create template error:', error);
      toast('Failed to create template', 'error');
    }
  };

  const handleCancel = () => {
    router.push(`/networks/${networkCode}/music-scheduling/templates`);
  };

  const isDirty = methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <div className="clock-template-create-page">
        <PageHeader
          title="Create Clock Template"
          description="Create a new reusable clock template for broadcast scheduling"
          icon={<ClockIcon />}
          breadcrumbs={[
            { label: 'Music Scheduling', href: `/networks/${networkCode}/music-scheduling` },
            { label: 'Templates', href: `/networks/${networkCode}/music-scheduling/templates` },
            { label: 'Create Template' },
          ]}
        />

        <div className="page-content">
          <EntityEditForm
            startSection={[
              <Card key="basic-info">
                <div className="template-form">
                  <div className="template-form__header">
                    <h3 className="template-form__title">Template Details</h3>
                    <p className="template-form__description">
                      Configure the basic information for your clock template
                    </p>
                  </div>

                  <div className="template-form__fields">
                    <Input
                      label="Template Name"
                      {...methods.register('name')}
                      placeholder="Enter template name"
                      error={methods.formState.errors.name?.message}
                      required
                    />

                    <Textarea
                      label="Description"
                      {...methods.register('description')}
                      placeholder="Optional description of this template"
                      rows={3}
                      error={methods.formState.errors.description?.message}
                    />

                    <div className="checkbox-field">
                      <input
                        type="checkbox"
                        id="isDefault"
                        {...methods.register('isDefault')}
                        className="checkbox-field__input"
                      />
                      <label htmlFor="isDefault" className="checkbox-field__label">
                        Set as default template
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            ]}
            endSection={
              <Card>
                <div className="template-form__info">
                  <h4 className="template-form__info-title">Next Steps</h4>
                  <p className="template-form__info-description">
                    After creating the template, you&apos;ll be taken to the template editor where you can:
                  </p>
                  <ul className="template-form__info-list">
                    <li>Set up the 7×24 hour grid</li>
                    <li>Assign clocks to specific time slots</li>
                    <li>Configure day-specific scheduling</li>
                  </ul>
                </div>
              </Card>
            }
          />
        </div>

        <ActionBar unsavedChanges={isDirty}>
          <Button variant="tertiary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={methods.handleSubmit(handleSubmit)}
            disabled={createLoading}
          >
            {createLoading ? 'Creating...' : 'Create Template'}
          </Button>
        </ActionBar>
      </div>
    </FormProvider>
  );
};