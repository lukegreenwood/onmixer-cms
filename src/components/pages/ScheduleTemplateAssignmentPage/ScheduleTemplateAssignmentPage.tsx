'use client';

import { useQuery } from '@apollo/client';
import { Button, Autocomplete } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { GET_DEFAULT_SCHEDULES } from '@/graphql';
import { GetDefaultSchedulesQuery } from '@/graphql/__generated__/graphql';
import { useNavigation } from '@/hooks/useNavigation';
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
  template: GetDefaultSchedulesQuery['defaultSchedules']['items'][number];
};

type DayAssignment = {
  day: string;
  templateId: string | null;
};

export function ScheduleTemplateAssignmentPage({
  className,
}: ScheduleTemplateAssignmentPageProps) {
  const router = useRouter();
  const { getNetworkRoutePath } = useNavigation();

  const [assignments, setAssignments] = useState<DayAssignment[]>(
    DAYS_OF_WEEK.map((day) => ({ day: day.key, templateId: null })),
  );

  // Fetch all available templates
  const { data: templatesData } = useQuery(GET_DEFAULT_SCHEDULES, {
    variables: {
      filters: {
        limit: 100, // Get all templates for selection
        offset: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const templates = useMemo(
    () => templatesData?.defaultSchedules?.items || [],
    [templatesData?.defaultSchedules?.items],
  );

  // Convert templates to autocomplete options
  const templateOptions: TemplateOption[] = useMemo(() => {
    const noTemplateOption: TemplateOption = {
      value: '',
      label: 'No template assigned',
      template:
        {} as GetDefaultSchedulesQuery['defaultSchedules']['items'][number],
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
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.day === day
            ? { ...assignment, templateId: templateId || null }
            : assignment,
        ),
      );

      // TODO: Call API to save assignment
      const templateName = templateId
        ? templates.find((t) => t.id === templateId)?.name || 'Template'
        : 'No template';

      toast(`${day}: ${templateName} assigned`, 'success');
    },
    [templates],
  );

  const handleAddTemplate = useCallback(() => {
    router.push(getNetworkRoutePath('scheduleTemplates'));
  }, [router, getNetworkRoutePath]);

  const renderTemplateItem = (
    template: GetDefaultSchedulesQuery['defaultSchedules']['items'][number],
  ) => {
    if (!template) return null;

    return (
      <div className="template-item">
        <div className="template-item__image">
          {/* TODO: Add actual template image when available */}
          <div className="template-item__placeholder">
            {template.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="template-item__content">
          <div className="template-item__title">{template.name}</div>
          <div className="template-item__meta">
            {/* TODO: Add actual time range from template items */}
            <span className="template-item__time">00:00 - 24:00</span>
            <span className="template-item__separator">•</span>
            <span className="template-item__network">
              {template.networks?.map((n) => n.name).join(', ') ||
                'No networks'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const getAssignedTemplate = (day: string) => {
    const assignment = assignments.find((a) => a.day === day);
    if (!assignment?.templateId) return null;
    return templates.find((t) => t.id === assignment.templateId) || null;
  };

  return (
    <div className={className}>
      <PageHeader
        heading="Schedule Template Assignment"
        subheading="Assign a template to specific days to quickly add a week to the schedule"
        actions={<Button onClick={handleAddTemplate}>Add Template</Button>}
      />

      <div className="page-content">
        <div className="schedule-assignment">
          <div className="schedule-assignment__grid">
            {DAYS_OF_WEEK.map((day) => {
              const assignedTemplate = getAssignedTemplate(day.key);
              const currentValue =
                assignments.find((a) => a.day === day.key)?.templateId || '';

              return (
                <div key={day.key} className="schedule-assignment__column">
                  <div className="schedule-assignment__day-header">
                    <div className="schedule-assignment__day-label">
                      <h3>{day.label}</h3>
                      <span className="schedule-assignment__day-full">
                        {day.fullLabel}
                      </span>
                    </div>

                    <div className="schedule-assignment__day-selector">
                      <Autocomplete
                        options={templateOptions}
                        value={currentValue}
                        onChange={(value) =>
                          handleTemplateAssignment(day.key, value || null)
                        }
                        placeholder="Select template..."
                        onSearch={() => {}} // TODO: Implement search functionality
                      />
                    </div>
                  </div>

                  <div className="schedule-assignment__day-content">
                    {assignedTemplate ? (
                      renderTemplateItem(assignedTemplate)
                    ) : (
                      <div className="schedule-assignment__empty">
                        No template assigned
                      </div>
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
