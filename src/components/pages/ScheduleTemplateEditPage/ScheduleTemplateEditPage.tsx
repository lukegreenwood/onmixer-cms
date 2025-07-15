'use client';

import { useMutation, useSuspenseQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Badge, Alert, Tooltip } from '@soundwaves/components';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useForm,
  FormProvider,
  useFieldArray,
  FieldErrors,
} from 'react-hook-form';
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
  BULK_UPSERT_DEFAULT_SCHEDULE_ITEMS,
  BULK_DELETE_DEFAULT_SCHEDULE_ITEMS,
} from '@/graphql';
import {
  GetDefaultScheduleQuery,
  MediaType,
} from '@/graphql/__generated__/graphql';
import { useNavigation } from '@/hooks';
import { DeleteIcon } from '@/icons';
import { toast } from '@/lib/toast';

const idNameSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const templateFormSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  networks: z.array(z.string()),
  items: z.array(
    z.object({
      databaseId: z.string(),
      start: z.string(),
      end: z.string(),
      endsNextDay: z.boolean(),
      episodeName: z.string().nullish(),
      episodeDesc: z.string().nullish(),
      show: idNameSchema,
      series: idNameSchema.nullish(),
      presenters: z.array(idNameSchema).nullish(),
      mediaId: z.string().nullish(),
      networks: z.array(z.string()).nullish(),
      existingEpisode: idNameSchema.nullish(),
      repeatOfId: z.string().nullish(),
    }),
  ),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

interface ScheduleTemplateEditPageProps {
  id: string;
}

const mapTemplateItem = (
  item: NonNullable<
    GetDefaultScheduleQuery['defaultSchedule']
  >['items'][number],
) => ({
  ...item,
  databaseId: item.id,
  show: {
    id: item.show.id,
    name: item.show.shortName,
  },
  networks: item.networks?.map((network) => network.id) || [],
  presenters:
    item.presenters?.map((presenter) => ({
      id: presenter.id,
      name: presenter.name,
    })) || [],
  series: item.series
    ? {
        id: item.series.id,
        name: item.series.shortName,
      }
    : undefined,
  existingEpisode: item.existingEpisode
    ? {
        id: item.existingEpisode.id,
        name: item.existingEpisode.name,
      }
    : undefined,
  repeatOfId: item.repeatOf?.id,
});

export function ScheduleTemplateEditPage({
  id,
}: ScheduleTemplateEditPageProps) {
  const { getNetworkRoutePath, networkGoTo } = useNavigation();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

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
  const [bulkUpsertItems, { loading: bulkUpsertLoading }] = useMutation(
    BULK_UPSERT_DEFAULT_SCHEDULE_ITEMS,
  );
  const [bulkDeleteItems, { loading: bulkDeleteLoading }] = useMutation(
    BULK_DELETE_DEFAULT_SCHEDULE_ITEMS,
  );

  const template = templateData?.defaultSchedule;

  // Store original item IDs to track deletions
  const originalItemIds = useMemo(
    () => template?.items.map((item) => item.id) || [],
    [template?.items],
  );

  // Form setup
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: template?.name || '',
      networks: template?.networks?.map((n) => n.id) || [],
      items: template?.items.map(mapTemplateItem) || [],
    },
    values: template
      ? {
          name: template.name,
          networks: template.networks?.map((n) => n.id) || [],
          items: template?.items.map(mapTemplateItem) || [],
        }
      : undefined,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });
  const selectedIndex = useMemo(
    () => fields.findIndex((field) => field.id === selectedId),
    [fields, selectedId],
  );

  const handleSubmit = useCallback(
    async (data: TemplateFormData) => {
      try {
        // First update the template basic info
        await updateTemplate({
          variables: {
            input: {
              id,
              name: data.name,
              networks: data.networks,
            },
          },
          refetchQueries: ['GetDefaultSchedules'],
        });

        // Detect items that were removed (exist in original but not in current form)
        const currentItemIds = data.items
          .map((item) => item.databaseId)
          .filter(Boolean);
        const removedItemIds = originalItemIds.filter(
          (originalId) => !currentItemIds.includes(originalId),
        );

        // First, delete removed items
        if (removedItemIds.length > 0) {
          await bulkDeleteItems({
            variables: {
              input: {
                ids: removedItemIds,
              },
            },
            refetchQueries: ['GetDefaultSchedules'],
          });
        }

        // Then upsert all the schedule items (supports both new and existing items)
        const itemsToUpsert = data.items.map((item) => ({
          id: item.databaseId || undefined, // If no databaseId, it's a new item
          defaultSchedule: id, // Required for all items
          start: item.start,
          end: item.end,
          endsNextDay: item.endsNextDay,
          episodeName: item.episodeName || undefined,
          episodeDesc: item.episodeDesc || undefined,
          show: item.show.id,
          series: item.series?.id || undefined,
          presenters:
            item.presenters?.map((p) => p.id).filter(Boolean) || undefined,
          networks: item.networks?.filter(Boolean) || undefined,
          existingEpisode: item.existingEpisode?.id || undefined,
          media: item.mediaId || undefined,
          repeatOf: item.repeatOfId || undefined,
        }));

        if (itemsToUpsert.length > 0) {
          await bulkUpsertItems({
            variables: {
              input: {
                items: itemsToUpsert,
              },
            },
            refetchQueries: ['GetDefaultSchedules'],
          });
        }

        toast('Schedule template updated successfully', 'success');
        networkGoTo('scheduleTemplates');
      } catch (error) {
        toast('Failed to update schedule template', 'error');
        console.error('Update template error:', error);
      }
    },
    [
      id,
      updateTemplate,
      bulkUpsertItems,
      bulkDeleteItems,
      originalItemIds,
      networkGoTo,
    ],
  );

  const handleInvalid = useCallback((errors: FieldErrors<TemplateFormData>) => {
    console.log('errors', errors);
  }, []);

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
                  items={fields.map((item) => {
                    const existingItem = template?.items.find(
                      (existing) => existing.id === item.databaseId,
                    );

                    return {
                      id: item.id,
                      image: existingItem ? (
                        <img
                          src={
                            existingItem.show.featuredImage.urls.customSquare ??
                            ''
                          }
                          alt=""
                        />
                      ) : undefined,
                      primary: (
                        <span className="flex flex-row">
                          <p className="text-sm-leading-6-font-medium ">
                            {existingItem?.show.shortName ||
                              item.show.name ||
                              `New item`}
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
                          {existingItem?.networks &&
                            existingItem.networks.length > 0 && (
                              <Tooltip
                                content="Networks"
                                size="sm"
                                color="secondary"
                              >
                                <span>
                                  {existingItem.networks
                                    .map((network) => network.name)
                                    .join(', ')}
                                </span>
                              </Tooltip>
                            )}
                          {item?.presenters && item.presenters.length > 0 && (
                            <Tooltip
                              content="Presenters"
                              size="sm"
                              color="secondary"
                            >
                              <span>
                                {item.presenters
                                  .map((presenter) => presenter.name)
                                  .join(', ')}
                              </span>
                            </Tooltip>
                          )}
                          {item?.series && (
                            <Tooltip
                              content="Series"
                              size="sm"
                              color="secondary"
                            >
                              <span>{item.series.name}</span>
                            </Tooltip>
                          )}
                        </div>
                      ),
                    };
                  })}
                  selectedId={selectedId}
                  onSelect={(id) => {
                    setSelectedId(id);
                  }}
                  onRemove={(id) => {
                    remove(fields.findIndex((field) => field.id === id));
                  }}
                  onAdd={() => {
                    append({
                      databaseId: '',
                      start: '',
                      end: '',
                      endsNextDay: false,
                      show: {
                        id: '',
                        name: '',
                      },
                      networks: [],
                      presenters: [],
                      series: null,
                      mediaId: '',
                      existingEpisode: null,
                      repeatOfId: '',
                    });
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
                {selectedId && (
                  <div className="card">
                    <DynamicForm
                      fields={[
                        {
                          component: 'showSelector',
                          name: `items.${selectedIndex}.show`,
                          label: 'Show',
                        },
                        {
                          component: 'time',
                          name: `items.${selectedIndex}.start`,
                          label: 'Start',
                        },
                        {
                          component: 'time',
                          name: `items.${selectedIndex}.end`,
                          label: 'End',
                        },
                        {
                          component: 'checkbox',
                          name: `items.${selectedIndex}.endsNextDay`,
                          label: 'Ends Next Day',
                        },
                        {
                          component: 'text',
                          name: `items.${selectedIndex}.episodeName`,
                          label: 'Episode Name',
                        },
                        {
                          component: 'text',
                          name: `items.${selectedIndex}.episodeDesc`,
                          label: 'Episode Description',
                        },
                        {
                          component: 'presenterSelector',
                          name: `items.${selectedIndex}.presenters`,
                          label: 'Presenters',
                        },
                        {
                          component: 'networkSelector',
                          name: `items.${selectedIndex}.networks`,
                          label: 'Networks',
                        },
                        {
                          component: 'seriesSelector',
                          name: `items.${selectedIndex}.series`,
                          label: 'Series',
                        },
                        {
                          component: 'mediaEditor',
                          name: `items.${selectedIndex}.mediaId`,
                          label: 'Media',
                          type: MediaType.FeaturedImage,
                        },
                        {
                          component: 'episodeSelector',
                          name: `items.${selectedIndex}.existingEpisode`,
                          label: 'Existing Episode',
                        },
                        {
                          component: 'text',
                          name: `items.${selectedIndex}.repeatOfId`,
                          label: 'Repeat of (schedule template item id)',
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
            </FormProvider>
          </div>
        </div>
        <ActionBar>
          <Button
            type="button"
            disabled={
              updateLoading ||
              bulkUpsertLoading ||
              bulkDeleteLoading ||
              !form.formState.isDirty
            }
            onClick={form.handleSubmit(handleSubmit, handleInvalid)}
          >
            Save
          </Button>
        </ActionBar>
      </div>
    </div>
  );
}
