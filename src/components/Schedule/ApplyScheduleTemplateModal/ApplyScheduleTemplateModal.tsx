'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  DatePicker,
  Dialog,
  Label,
  Loading,
  Tabs,
  ToggleGroup,
} from '@soundwaves/components';
import { format, addDays, getDay } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { APPLY_ASSIGNED_DEFAULT_SCHEDULE } from '@/graphql/mutations/applyAssignedDefaultSchedule';
import { toast } from '@/lib';

export type ApplyScheduleTemplateModalProps = {
  scheduleDate: Date;
  networkId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const schema = z.object({
  date: z.date(),
  assignedTo: z.array(z.string()).min(1, 'At least one day must be selected'),
});

const DAYS_OF_WEEK = [
  { value: 'MONDAY', label: 'Mon', dayIndex: 0 },
  { value: 'TUESDAY', label: 'Tue', dayIndex: 1 },
  { value: 'WEDNESDAY', label: 'Wed', dayIndex: 2 },
  { value: 'THURSDAY', label: 'Thu', dayIndex: 3 },
  { value: 'FRIDAY', label: 'Fri', dayIndex: 4 },
  { value: 'SATURDAY', label: 'Sat', dayIndex: 5 },
  { value: 'SUNDAY', label: 'Sun', dayIndex: 6 },
];

const dayValueToIndex = Object.fromEntries(
  DAYS_OF_WEEK.map((day) => [day.value, day.dayIndex]),
);

const sortDays = (days: string[]) => {
  const sortedDays = [...days].sort(
    (a, b) => dayValueToIndex[a] - dayValueToIndex[b],
  );

  return sortedDays;
};

export const ApplyScheduleTemplateModal = ({
  scheduleDate,
  networkId,
  open,
  onOpenChange,
}: ApplyScheduleTemplateModalProps) => {
  const [previewDates, setPreviewDates] = useState<Date[]>([]);

  const [applyScheduleTemplate, { loading }] = useMutation(
    APPLY_ASSIGNED_DEFAULT_SCHEDULE,
    {
      onCompleted: (data) => {
        if (data.applyAssignedDefaultSchedule.success) {
          toast('Schedule template applied successfully', 'success');
          onOpenChange(false);
        } else {
          toast(
            data.applyAssignedDefaultSchedule.message ||
              'Failed to apply schedule template',
            'error',
          );
        }
      },
      onError: (error) => {
        toast('There was an error applying the schedule template', 'error');
        console.error(error);
      },
    },
  );

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      date: scheduleDate,
      assignedTo: [],
    },
    resolver: zodResolver(schema),
  });

  const selectedDate = watch('date');
  const selectedDays = watch('assignedTo');

  // Update preview dates when selected days or date changes
  useMemo(() => {
    if (selectedDays.length === 0) {
      setPreviewDates([]);
      return;
    }

    const dates: Date[] = [];
    const startDate = new Date(selectedDate);

    // Create a map of day values to their indices for easier lookup
    const sortedDays = sortDays(selectedDays);

    let currentDate = startDate;
    let daysChecked = 0;

    while (dates.length < sortedDays.length && daysChecked < 7) {
      const dayIndex = currentDate.getDay();
      const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert Sunday (0) to 6 for Monday-based index

      const matchingDay = sortedDays.find(
        (day) =>
          dayValueToIndex[day] === adjustedDayIndex &&
          !dates.some((d) => {
            const dDayIndex = getDay(d);
            const dAdjustedDayIndex = dDayIndex === 0 ? 6 : dDayIndex - 1;
            return dAdjustedDayIndex === adjustedDayIndex;
          }),
      );

      if (matchingDay) {
        dates.push(new Date(currentDate));
      }

      currentDate = addDays(currentDate, 1);
      daysChecked++;
    }

    setPreviewDates(dates);
  }, [selectedDays, selectedDate]);

  const isDateUnavailable = useCallback(
    (date: Date) => {
      if (selectedDays.length === 0) return false;

      const firstDay = sortDays(selectedDays)[0];
      const dayInfo = DAYS_OF_WEEK.find((day) => day.value === firstDay);
      const firstSelectedDayIndex = dayInfo ? dayInfo.dayIndex : -1;

      const dayIndex = date.getDay();
      const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert Sunday (0) to 6 for Monday-based index
      return adjustedDayIndex !== firstSelectedDayIndex;
    },
    [selectedDays],
  );

  const handleSave = (values: z.infer<typeof schema>) => {
    applyScheduleTemplate({
      variables: {
        networkId,
        date: values.date.toISOString(),
        assignedTo: values.assignedTo,
      },
    });
  };

  const handleInvalid = () => {
    toast('There were issues applying the schedule template', 'error');
  };

  const handleCancel = () => {
    reset();
    setPreviewDates([]);
    onOpenChange(false);
  };

  const toggleAllDays = () => {
    if (selectedDays.length === DAYS_OF_WEEK.length) {
      setValue('assignedTo', []);
    } else {
      const allDays = DAYS_OF_WEEK.map((day) => day.value);
      setValue('assignedTo', allDays);
    }
  };

  const handleToggleChange = (value: string[]) => {
    setValue('assignedTo', value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content dismissable>
        <Dialog.Title>Apply Schedule Template</Dialog.Title>
        <Tabs
          defaultValue="apply-assigned-template"
          orientation="horizontal"
          variant="underlined"
        >
          <Tabs.List>
            <Tabs.Trigger value="apply-assigned-template">
              Apply assigned template
            </Tabs.Trigger>
            <Tabs.Trigger value="apply-custom-template">
              Apply custom template
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="apply-assigned-template">
            <div className="flex flex--column form">
              <div className="form-control">
                <Label
                  description={
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={toggleAllDays}
                    >
                      {selectedDays.length === DAYS_OF_WEEK.length
                        ? 'Deselect All'
                        : 'Select All'}
                    </Button>
                  }
                >
                  Days to Apply
                </Label>
                <div>
                  <ToggleGroup
                    type="multiple"
                    value={selectedDays}
                    onValueChange={handleToggleChange}
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <ToggleGroup.Item key={day.value} value={day.value}>
                        {day.label}
                      </ToggleGroup.Item>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <Controller
                control={control}
                name="date"
                render={({ field }) => {
                  const { onChange, value: currentValue, ...rest } = field;
                  return (
                    <DatePicker
                      label="Start Date"
                      {...rest}
                      value={currentValue}
                      onChange={(value) => {
                        if (value) {
                          onChange(value.toDate('UTC'));
                        }
                      }}
                      isDateUnavailable={(date) =>
                        isDateUnavailable(date.toDate('UTC'))
                      }
                    />
                  );
                }}
              />

              {previewDates.length > 0 && (
                <div className="flex flex--column">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewDates.map((date, index) => (
                        <tr key={index}>
                          <td>
                            {
                              DAYS_OF_WEEK.find(
                                (day) =>
                                  day.value ===
                                  selectedDays[index % selectedDays.length],
                              )?.label
                            }
                          </td>
                          <td>{format(date, 'EEEE, MMMM d, yyyy')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex--row flex--justify-end width-full">
                <Button variant="transparent" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleSubmit(handleSave, handleInvalid)()}
                  after={loading ? <Loading size="xxs" /> : undefined}
                  disabled={loading || selectedDays.length === 0}
                >
                  Apply Template
                </Button>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="apply-custom-template">
            Content for Tab 2
          </Tabs.Content>
        </Tabs>
      </Dialog.Content>
    </Dialog>
  );
};
