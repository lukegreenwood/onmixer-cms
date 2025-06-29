import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  DatePicker,
  Label,
  Loading,
  ToggleGroup,
} from '@soundwaves/components';
import { format, addDays, getDay } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

import { APPLY_ASSIGNED_DEFAULT_SCHEDULE } from '@/graphql/mutations/applyAssignedDefaultSchedule';
import { toast } from '@/lib';

const schema = z
  .object({
    date: z.date(),
    assignedTo: z.array(z.string()).min(1, 'At least one day must be selected'),
  })
  .superRefine((data, ctx) => {
    const firstDay = sortDays(data.assignedTo)[0];
    const dayObject = DAYS_OF_WEEK.find((day) => day.value === firstDay);

    if (!dayObject) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid day selected',
        fatal: true,
        path: ['assignedTo'],
      });
    }

    const adjustedDayIndex =
      data.date.getDay() === 0 ? 6 : data.date.getDay() - 1;
    if (adjustedDayIndex !== dayObject?.dayIndex) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Date must be on a ${dayObject?.label}`,
        path: ['date'],
      });
    }
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

export const ApplyAssignedTab = ({
  scheduleDate,
  networkId,
  onOpenChange,
}: {
  scheduleDate: Date;
  networkId: string;
  onOpenChange: (open: boolean) => void;
}) => {
  const [applyScheduleTemplate, { loading }] = useMutation(
    APPLY_ASSIGNED_DEFAULT_SCHEDULE,
    {
      refetchQueries: ['Schedule'],
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

  const previewDates = useMemo(() => {
    if (selectedDays.length === 0) {
      return [];
    }

    const sortedDays = sortDays(selectedDays);

    // Create an array of the next 7 days starting from the selected date
    const nextSevenDays = Array.from({ length: 7 }, (_, i) =>
      addDays(new Date(selectedDate), i),
    );

    return nextSevenDays
      .filter((date) => {
        const dayIndex = date.getDay();
        const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

        // Check if this day is in our selected days
        return sortedDays.some(
          (day) => dayValueToIndex[day] === adjustedDayIndex,
        );
      })
      .filter((date, index, self) => {
        const dayIndex = date.getDay();
        const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        return (
          self.findIndex((findDate) => {
            const findDayIndex = getDay(findDate);
            const findAdjustedDayIndex =
              findDayIndex === 0 ? 6 : findDayIndex - 1;
            return findAdjustedDayIndex === adjustedDayIndex;
          }) === index
        );
      })
      .slice(0, sortedDays.length); // Limit to the number of selected days
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

  const handleInvalid = (errors: FieldErrors<z.infer<typeof schema>>) => {
    toast('There were issues applying the schedule template', 'error');
    console.error(errors);
  };

  const handleCancel = () => {
    reset();
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
    <div className="flex flex--column form">
      <div className="form-control">
        <Label
          description={
            <Button variant="tertiary" size="sm" onClick={toggleAllDays}>
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
        render={({ field, fieldState }) => {
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
              errorMessage={fieldState.error?.message}
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
  );
};
