'use client';

import { useQuery, useMutation, useSuspenseQuery } from '@apollo/client';
import { Button, Autocomplete, Loading } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import uniqBy from 'lodash.uniqby';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

import { PageHeader, ItemList } from '@/blocks';
import {
  SEARCH_DEFAULT_SCHEDULE,
  ASSIGN_DEFAULT_SCHEDULE_TO_NETWORK,
  GET_DEFAULT_SCHEDULES,
} from '@/graphql';
import {
  SearchDefaultScheduleQuery,
  DefaultScheduleFilterField,
  FilterType,
  GetDefaultSchedulesQuery,
} from '@/graphql/__generated__/graphql';
import { useNavigation } from '@/hooks/useNavigation';
import { useNetwork } from '@/hooks/useNetwork';
import { toast } from '@/lib/toast';

const DAYS_OF_WEEK = [
  { key: 'MONDAY', label: 'Mon', fullLabel: 'Monday' },
  { key: 'TUESDAY', label: 'Tues', fullLabel: 'Tuesday' },
  { key: 'WEDNESDAY', label: 'Wed', fullLabel: 'Wednesday' },
  { key: 'THURSDAY', label: 'Thurs', fullLabel: 'Thursday' },
  { key: 'FRIDAY', label: 'Fri', fullLabel: 'Friday' },
  { key: 'SATURDAY', label: 'Sat', fullLabel: 'Saturday' },
  { key: 'SUNDAY', label: 'Sun', fullLabel: 'Sunday' },
];

interface ScheduleTemplateAssignmentPageProps {
  className?: string;
}

type TemplateOption = {
  value: string;
  label: string;
  template: SearchDefaultScheduleQuery['defaultSchedules']['items'][number];
};

export function ScheduleTemplateAssignmentPage({
  className,
}: ScheduleTemplateAssignmentPageProps) {
  const router = useRouter();
  const { getNetworkRoutePath } = useNavigation();
  const { currentNetwork } = useNetwork();

  const [assignToNetwork, { loading: assignLoading }] = useMutation(
    ASSIGN_DEFAULT_SCHEDULE_TO_NETWORK,
    {
      onCompleted: (data) => {
        if (data.assignDefaultScheduleToNetwork.success) {
          toast(
            data.assignDefaultScheduleToNetwork.message ||
              'Template assigned successfully',
            'success',
          );
        } else {
          toast(
            data.assignDefaultScheduleToNetwork.message ||
              'Failed to assign template',
            'error',
          );
        }
      },
      onError: (error) => {
        console.error('Assignment error:', error);
        toast('Failed to assign template', 'error');
      },
      refetchQueries: [
        {
          query: GET_DEFAULT_SCHEDULES,
          variables: {
            filters: {
              limit: 10,
              filter: currentNetwork?.id
                ? [
                    {
                      field: DefaultScheduleFilterField.Networks,
                      type: FilterType.Equal,
                      value: currentNetwork.id,
                    },
                    {
                      field: DefaultScheduleFilterField.AssignedTo,
                      type: FilterType.List,
                      value: DAYS_OF_WEEK.map((day) => day.key).join(','),
                    },
                  ]
                : [],
            },
          },
        },
      ],
    },
  );

  // Fetch existing assignments for the current network
  const { data: existingAssignments } = useSuspenseQuery(
    GET_DEFAULT_SCHEDULES,
    {
      variables: {
        filters: {
          limit: 10,
          filter: currentNetwork?.id
            ? [
                {
                  field: DefaultScheduleFilterField.Networks,
                  type: FilterType.Equal,
                  value: currentNetwork.id,
                },
                {
                  field: DefaultScheduleFilterField.AssignedTo,
                  type: FilterType.List,
                  value: DAYS_OF_WEEK.map((day) => day.key).join(','),
                },
              ]
            : [],
        },
      },
      skip: !currentNetwork?.id,
    },
  );

  // Search templates with debounced search
  const {
    data: templatesData,
    refetch,
    loading: templatesLoading,
  } = useQuery(SEARCH_DEFAULT_SCHEDULE, {
    variables: {
      filters: {
        limit: 20,
        filter: [
          {
            field: DefaultScheduleFilterField.Id,
            type: FilterType.Contains,
            value: '',
          },
        ],
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const templates = useMemo(
    () =>
      uniqBy(
        [
          ...(templatesData?.defaultSchedules?.items || []),
          ...(existingAssignments?.defaultSchedules?.items || []),
        ],
        'id',
      ),
    [
      templatesData?.defaultSchedules?.items,
      existingAssignments?.defaultSchedules?.items,
    ],
  );

  const templateOptions: TemplateOption[] = useMemo(() => {
    const noTemplateOption: TemplateOption = {
      value: '',
      label: 'No template assigned',
      template:
        {} as SearchDefaultScheduleQuery['defaultSchedules']['items'][number],
    };

    const templateOpts: TemplateOption[] = templates.map((template) => ({
      value: template.id,
      label: template.name,
      template,
    }));

    return [noTemplateOption, ...templateOpts];
  }, [templates]);

  const handleTemplateAssignment = useCallback(
    (day: string, templateId: string | null) => {
      if (!currentNetwork?.id) {
        toast('Network not selected', 'error');
        return;
      }

      if (templateId) {
        assignToNetwork({
          variables: {
            input: {
              networkId: currentNetwork.id,
              defaultScheduleId: templateId,
              days: [day],
            },
          },
        });
      }
    },
    [currentNetwork?.id, assignToNetwork],
  );

  const handleAddTemplate = useCallback(() => {
    router.push(getNetworkRoutePath('scheduleTemplates'));
  }, [router, getNetworkRoutePath]);

  const renderTemplateItems = (
    template:
      | SearchDefaultScheduleQuery['defaultSchedules']['items'][number]
      | GetDefaultSchedulesQuery['defaultSchedules']['items'][number],
  ) => {
    if (!template) return [];

    // For the assignment page, we'll show a simplified version since we don't have the full template items
    return template.items.length > 0
      ? template.items.map((item) => ({
          id: item.id,
          primary: (
            <p className="text-sm-leading-6-font-medium">
              {item.episodeName ?? item.show.shortName}
            </p>
          ),
          secondary: (
            <p>
              {item.start} - {item.end}
            </p>
          ),
          image: item.media?.urls.customSquare ? (
            <img src={item.media?.urls.customSquare} alt="" />
          ) : (
            <img src={item.show.featuredImage.urls.customSquare ?? ''} alt="" />
          ),
        }))
      : [];
  };

  const handleSearchChange = useCallback(
    (search: string) => {
      refetch({
        filters: {
          limit: 20,
          filter: [
            {
              field: DefaultScheduleFilterField.Name,
              type: FilterType.Contains,
              value: search,
            },
          ],
        },
      });
    },
    [refetch],
  );

  const debouncedHandleSearch = useDebouncer(handleSearchChange, { wait: 500 });

  const getAssignedTemplate = useCallback(
    (day: string) => {
      return (
        templates.find((template) => template.assignedTo?.includes(day)) || null
      );
    },
    [templates],
  );

  return (
    <div className={className}>
      <PageHeader
        heading="Schedule Template Assignment"
        subheading="Assign a template to specific days to quickly add a week to the schedule"
        actions={<Button onClick={handleAddTemplate}>Add Template</Button>}
      />

      <div className="page-content">
        <div className="schedule-template-assignment">
          <div className="schedule-template-assignment__grid">
            {DAYS_OF_WEEK.map((day) => {
              const assignedTemplate = getAssignedTemplate(day.key);
              const currentValue = assignedTemplate?.id || '';

              return (
                <div
                  key={day.key}
                  className="schedule-template-assignment__column"
                >
                  <div className="schedule-template-assignment__day-content">
                    {assignedTemplate ? (
                      <ItemList
                        items={[
                          {
                            id: day.key,
                            primary: (
                              <span className="flex flex-row">
                                <p className="text-sm-leading-6-font-medium">
                                  {day.label}
                                </p>
                                <Autocomplete
                                  options={templateOptions}
                                  value={currentValue}
                                  onChange={(value) =>
                                    handleTemplateAssignment(
                                      day.key,
                                      value || null,
                                    )
                                  }
                                  placeholder="Select template..."
                                  onSearch={debouncedHandleSearch.maybeExecute}
                                  disabled={assignLoading}
                                  after={
                                    templatesLoading ? (
                                      <Loading size="xs" />
                                    ) : undefined
                                  }
                                />
                              </span>
                            ),
                          },
                          ...renderTemplateItems(assignedTemplate),
                        ]}
                      />
                    ) : (
                      <ItemList
                        items={[
                          {
                            id: day.key,
                            primary: (
                              <span className="flex flex-row">
                                <p className="text-sm-leading-6-font-medium">
                                  {day.label}
                                </p>
                                <Autocomplete
                                  options={templateOptions}
                                  value={currentValue}
                                  onChange={(value) =>
                                    handleTemplateAssignment(
                                      day.key,
                                      value || null,
                                    )
                                  }
                                  placeholder="Select template..."
                                  onSearch={debouncedHandleSearch.maybeExecute}
                                  disabled={assignLoading}
                                  after={
                                    templatesLoading ? (
                                      <Loading size="xs" />
                                    ) : undefined
                                  }
                                />
                              </span>
                            ),
                          },
                          {
                            id: 'no-template',
                            primary: <p>No template assigned</p>,
                          },
                        ]}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
