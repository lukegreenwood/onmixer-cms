'use client';

import { useMutation, useSuspenseQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Badge, Alert } from '@soundwaves/components';
import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import {
  PageHeader,
  DeleteConfirmationPopover,
  ActionBar,
  ItemList,
} from '@/blocks';
import { DynamicForm } from '@/components';
import {
  DELETE_SCHEDULE_TEMPLATE,
  UPDATE_SCHEDULE_TEMPLATE,
  GET_DEFAULT_SCHEDULE,
  DUPLICATE_SCHEDULE_TEMPLATE,
} from '@/graphql';
import { useNavigation } from '@/hooks';
import { DeleteIcon } from '@/icons';
import { toast } from '@/lib/toast';

const templateFormSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  networks: z.array(z.string()),
  assignedTo: z.array(z.string()).optional(),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

interface ScheduleTemplateEditPageProps {
  id: string;
}

export function ScheduleTemplateEditPage({
  id,
}: ScheduleTemplateEditPageProps) {
  const { getNetworkRoutePath, networkGoTo } = useNavigation();

  const { data: templateData, error: templateError } = useSuspenseQuery(
    GET_DEFAULT_SCHEDULE,
    {
      variables: { id },
      skip: !id,
    },
  );

  const [updateTemplate, { loading: updateLoading }] = useMutation(
    UPDATE_SCHEDULE_TEMPLATE,
  );
  const [deleteTemplate, { loading: deleteLoading }] = useMutation(
    DELETE_SCHEDULE_TEMPLATE,
  );
  const [duplicateTemplate, { loading: duplicateLoading }] = useMutation(
    DUPLICATE_SCHEDULE_TEMPLATE,
  );

  const template = templateData?.defaultSchedule;

  // Form setup
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: '',
      networks: [],
      assignedTo: [],
    },
    values: template
      ? {
          name: template.name,
          networks: template.networks?.map((n) => n.id) || [],
          assignedTo: template.assignedTo || [],
        }
      : undefined,
  });

  const handleSubmit = useCallback(
    (data: TemplateFormData) => {
      updateTemplate({
        variables: {
          input: {
            id,
            name: data.name,
            networks: data.networks,
          },
        },
        refetchQueries: ['GetDefaultSchedules'],
        onCompleted: () => {
          toast('Schedule template updated successfully', 'success');
          networkGoTo('scheduleTemplates');
        },
        onError: (error) => {
          toast('Failed to update schedule template', 'error');
          console.error('Update template error:', error);
        },
      });
    },
    [id, updateTemplate, networkGoTo],
  );

  const handleDelete = useCallback(() => {
    deleteTemplate({
      variables: { input: { id } },
      refetchQueries: ['GetDefaultSchedules'],
      onCompleted: () => {
        toast('Schedule template deleted successfully', 'success');
        networkGoTo('scheduleTemplates');
      },
      onError: (error) => {
        toast('Failed to delete schedule template', 'error');
        console.error('Delete template error:', error);
      },
    });
  }, [id, deleteTemplate, networkGoTo]);

  const handleDuplicate = useCallback(() => {
    duplicateTemplate({
      variables: { input: { id } },
      refetchQueries: ['GetDefaultSchedules'],
      onCompleted: (data) => {
        toast('Schedule template duplicated successfully', 'success');
        networkGoTo('scheduleTemplateEdit', [
          data.duplicateDefaultSchedule.defaultSchedule.id,
        ]);
      },
      onError: (error) => {
        toast('Failed to duplicate schedule template', 'error');
        console.error('Duplicate template error:', error);
      },
    });
  }, [id, duplicateTemplate, networkGoTo]);

  if (templateError) {
    return (
      <div className="page-content">
        <Alert
          variant="expanded"
          color="error"
          title="Error fetching schedule template"
        >
          {templateError.message}
        </Alert>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="page-content">
        <Alert
          variant="expanded"
          color="error"
          title="Could not get schedule template"
        >
          Please check the template id provided is valid and try again.
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        heading={template.name}
        backTo={getNetworkRoutePath('scheduleTemplates')}
        headingExtras={
          <>
            <Badge color="red" size="sm">
              #{template.id}
            </Badge>
          </>
        }
        actions={
          <div className="flex gap-2">
            <DeleteConfirmationPopover
              entityType="Schedule Template"
              onConfirm={handleDelete}
              entityName={template.name}
              disabled={deleteLoading}
            >
              <Button variant="tertiary" destructive before={<DeleteIcon />}>
                Delete
              </Button>
            </DeleteConfirmationPopover>
            <Button
              onClick={handleDuplicate}
              variant="tertiary"
              disabled={duplicateLoading}
            >
              Duplicate
            </Button>
          </div>
        }
      />

      <div className="page-content">
        <div className="entity-edit-form">
          <div className="entity-edit-form__content">
            <FormProvider {...form}>
              <div className="entity-edit-form__start">
                <ItemList
                  items={template.items.map((item) => ({
                    id: item.id,
                    image: (
                      <img
                        src={item.show.featuredImage.urls.customSquare ?? ''}
                        alt=""
                      />
                    ),
                    primary: (
                      <span className="flex flex-row">
                        <p className="text-sm-leading-6-font-medium ">
                          {item.show.shortName}
                        </p>
                        {item.episodeName && (
                          <p className="text-muted">{item.episodeName}</p>
                        )}
                      </span>
                    ),
                    secondary: (
                      <div className="meta-list">
                        <span>
                          {item.start} - {item.end}
                        </span>
                        {item.networks && (
                          <span>
                            {item.networks
                              .map((network) => network.name)
                              .join(', ')}
                          </span>
                        )}
                        {item.presenters && (
                          <span>
                            {item.presenters
                              .map((presenter) => presenter.name)
                              .join(', ')}
                          </span>
                        )}
                        {item.series && <span>{item.series.shortName}</span>}
                      </div>
                    ),
                  }))}
                  onSelect={(id) => {
                    form.setValue('networks', [id]);
                  }}
                />
              </div>
              <div className="entity-edit-form__end">
                <div className="card">
                  <DynamicForm
                    fields={[
                      {
                        component: 'text',
                        name: 'name',
                        label: 'Template Name',
                        placeholder: 'Enter template name',
                      },
                      {
                        component: 'networkSelector',
                        name: 'networks',
                        label: 'Networks',
                      },
                    ]}
                  />
                </div>
                <div className="card">
                  <DynamicForm fields={[]} />
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
        <ActionBar>
          <Button
            type="button"
            disabled={updateLoading || !form.formState.isDirty}
            onClick={() => form.handleSubmit(handleSubmit)()}
          >
            Save
          </Button>
        </ActionBar>
      </div>
    </div>
  );
}
