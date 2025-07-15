'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@soundwaves/components';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useForm,
  FormProvider,
  useFieldArray,
  FieldErrors,
} from 'react-hook-form';
import { z } from 'zod';

import { PageHeader, ActionBar, ItemList } from '@/blocks';
import { DynamicForm } from '@/components';
import {
  CREATE_SCHEDULE_TEMPLATE,
  BULK_UPSERT_DEFAULT_SCHEDULE_ITEMS,
  ASSIGN_DEFAULT_SCHEDULE_TO_NETWORK,
} from '@/graphql';
import { MediaType } from '@/graphql/__generated__/graphql';
import { useNavigation } from '@/hooks';
import { useNetwork } from '@/hooks/useNetwork';
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

export function ScheduleTemplateCreatePage() {
  const { getNetworkRoutePath, networkGoTo } = useNavigation();
  const { currentNetwork } = useNetwork();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const [createTemplate, { loading: createLoading }] = useMutation(
    CREATE_SCHEDULE_TEMPLATE,
  );
  const [bulkUpsertItems, { loading: bulkUpsertLoading }] = useMutation(
    BULK_UPSERT_DEFAULT_SCHEDULE_ITEMS,
  );
  const [assignToNetwork] = useMutation(ASSIGN_DEFAULT_SCHEDULE_TO_NETWORK);

  // Form setup
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: '',
      networks: [],
      items: [],
    },
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
        // First create the template
        const createResult = await createTemplate({
          variables: {
            input: {
              name: data.name,
              networks: data.networks,
            },
          },
          refetchQueries: ['GetDefaultSchedules'],
        });

        const createdTemplateId =
          createResult.data?.createDefaultSchedule?.defaultSchedule?.id;

        if (!createdTemplateId) {
          throw new Error('Failed to create template - no ID returned');
        }

        // Then create all the schedule items if any exist
        if (data.items.length > 0) {
          const itemsToCreate = data.items.map((item) => ({
            defaultSchedule: createdTemplateId,
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

          await bulkUpsertItems({
            variables: {
              input: {
                items: itemsToCreate,
              },
            },
            refetchQueries: ['GetDefaultSchedules'],
          });
        }

        // Auto-assign to current network if networks were selected
        if (currentNetwork?.id && data.networks.includes(currentNetwork.id)) {
          try {
            await assignToNetwork({
              variables: {
                input: {
                  networkId: currentNetwork.id,
                  defaultScheduleId: createdTemplateId,
                  days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
                },
              },
            });
          } catch (assignError) {
            console.error('Auto-assignment error:', assignError);
            // Don't fail the whole operation if assignment fails
          }
        }

        toast('Schedule template created successfully', 'success');
        networkGoTo('scheduleTemplateEdit', [createdTemplateId]);
      } catch (error) {
        toast('Failed to create schedule template', 'error');
        console.error('Create template error:', error);
      }
    },
    [createTemplate, bulkUpsertItems, assignToNetwork, currentNetwork?.id, networkGoTo],
  );

  const handleInvalid = useCallback((errors: FieldErrors<TemplateFormData>) => {
    console.log('errors', errors);
  }, []);

  return (
    <div>
      <PageHeader
        heading="Create Schedule Template"
        backTo={getNetworkRoutePath('scheduleTemplates')}
      />

      <div className="page-content">
        <div className="entity-edit-form">
          <div className="entity-edit-form__content">
            <FormProvider {...form}>
              <div className="entity-edit-form__start">
                <ItemList
                  items={fields.map((item) => ({
                    id: item.id,
                    primary: (
                      <span className="flex flex-row">
                        <p className="text-sm-leading-6-font-medium ">
                          {item.show.name || `New item`}
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
                        {item?.presenters && item.presenters.length > 0 && (
                          <span>
                            {item.presenters
                              .map((presenter) => presenter.name)
                              .join(', ')}
                          </span>
                        )}
                        {item?.series && <span>{item.series.name}</span>}
                      </div>
                    ),
                  }))}
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
            disabled={createLoading || bulkUpsertLoading}
            onClick={form.handleSubmit(handleSubmit, handleInvalid)}
          >
            Create Template
          </Button>
        </ActionBar>
      </div>
    </div>
  );
}
