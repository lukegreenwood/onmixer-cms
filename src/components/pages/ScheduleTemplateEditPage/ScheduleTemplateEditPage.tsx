'use client';

import { useQuery, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, MultiSelect, Badge } from '@soundwaves/components';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { DELETE_SCHEDULE_TEMPLATE } from '@/graphql/mutations/deleteScheduleTemplate';
import { UPDATE_SCHEDULE_TEMPLATE } from '@/graphql/mutations/updateScheduleTemplate';
import { GET_NETWORKS } from '@/graphql/queries/networks';
import { GET_SCHEDULE_TEMPLATE } from '@/graphql/queries/scheduleTemplates';
import { toast } from '@/lib/toast';

const templateFormSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  networks: z.array(z.string()),
  assignedTo: z.array(z.string()).optional(),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

const DAYS_OF_WEEK = [
  { value: 'MONDAY', label: 'Monday' },
  { value: 'TUESDAY', label: 'Tuesday' },
  { value: 'WEDNESDAY', label: 'Wednesday' },
  { value: 'THURSDAY', label: 'Thursday' },
  { value: 'FRIDAY', label: 'Friday' },
  { value: 'SATURDAY', label: 'Saturday' },
  { value: 'SUNDAY', label: 'Sunday' },
];

interface ScheduleTemplateEditPageProps {
  className?: string;
}

export function ScheduleTemplateEditPage({ className }: ScheduleTemplateEditPageProps) {
  const router = useRouter();
  const params = useParams();
  const templateId = params?.id as string;

  const [isDeleting, setIsDeleting] = useState(false);

  // GraphQL
  const { data: templateData, loading: templateLoading } = useQuery(GET_SCHEDULE_TEMPLATE, {
    variables: { id: templateId },
    skip: !templateId,
  });

  const { data: networksData, loading: networksLoading } = useQuery(GET_NETWORKS);

  const [updateTemplate, { loading: updateLoading }] = useMutation(UPDATE_SCHEDULE_TEMPLATE);
  const [deleteTemplate] = useMutation(DELETE_SCHEDULE_TEMPLATE);

  const template = templateData?.defaultSchedule;
  const networks = networksData?.networks || [];

  // Form setup
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: '',
      networks: [],
      assignedTo: [],
    },
    values: template ? {
      name: template.name,
      networks: template.networks?.map(n => n.id) || [],
      assignedTo: template.assignedTo || [],
    } : undefined,
  });

  const handleSubmit = useCallback(async (data: TemplateFormData) => {
    try {
      await updateTemplate({
        variables: {
          input: {
            id: templateId,
            name: data.name,
            networks: data.networks,
          },
        },
      });

      toast('Schedule template updated successfully', 'success');
      router.push('/schedule/templates');
    } catch (error) {
      toast('Failed to update schedule template', 'error');
      console.error('Update template error:', error);
    }
  }, [templateId, updateTemplate, router]);

  const handleDelete = useCallback(async () => {
    if (!confirm('Are you sure you want to delete this schedule template? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTemplate({
        variables: {
          input: { id: templateId },
        },
      });

      toast('Schedule template deleted successfully', 'success');
      router.push('/schedule/templates');
    } catch (error) {
      toast('Failed to delete schedule template', 'error');
      console.error('Delete template error:', error);
    } finally {
      setIsDeleting(false);
    }
  }, [templateId, deleteTemplate, router]);

  const handleDuplicate = useCallback(() => {
    // TODO: Implement duplicate functionality
    toast('Duplicate functionality not yet implemented', 'info');
  }, []);

  const networkOptions = networks.map(network => ({
    value: network.id,
    label: network.name,
  }));

  if (templateLoading) {
    return <div>Loading template...</div>;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div className={className}>
      <PageHeader
        heading={template.name}
        subheading={`#${template.id}`}
        actions={
          <div className="flex gap-2">
            <Button
              onClick={() => router.push('/schedule/templates')}
              variant="outline"
            >
              Back to Templates
            </Button>
            <Button
              onClick={handleDuplicate}
              variant="outline"
            >
              Duplicate
            </Button>
          </div>
        }
      />

      <div className="page-content">
        <div className="schedule-template-edit">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="schedule-template-edit__form">
            <div className="schedule-template-edit__header">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    label="Template Name"
                    placeholder="Enter template name"
                    {...field}
                    helperText={fieldState.error?.message}
                    destructive={!!fieldState.error}
                  />
                )}
              />
            </div>

            <div className="schedule-template-edit__sections">
              <div className="schedule-template-edit__section">
                <h3>Edit selected item</h3>
                
                <div className="schedule-template-edit__form-row">
                  <Controller
                    name="networks"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <MultiSelect
                        label="Networks"
                        options={networkOptions}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                        destructive={!!fieldState.error}
                        disabled={networksLoading}
                      />
                    )}
                  />
                </div>

                <div className="schedule-template-edit__form-row">
                  <Controller
                    name="assignedTo"
                    control={form.control}
                    render={({ field }) => (
                      <MultiSelect
                        label="Assigned Days (optional)"
                        options={DAYS_OF_WEEK}
                        value={field.value || []}
                        onChange={field.onChange}
                        helperText="Select days of the week this template applies to"
                      />
                    )}
                  />
                </div>

                <div className="schedule-template-edit__current-networks">
                  <label>Current Networks:</label>
                  <div className="schedule-template-edit__network-badges">
                    {template.networks?.map(network => (
                      <Badge key={network.id}>
                        {network.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="schedule-template-edit__actions">
              <Button
                type="button"
                variant="outline"
                destructive
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Template'}
              </Button>
              <Button
                type="submit"
                disabled={updateLoading || !form.formState.isDirty}
              >
                {updateLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}