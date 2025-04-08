'use client';

import { useMutation } from '@apollo/client';
import { utc } from '@date-fns/utc';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CalendarEditIcon,
  DatePicker,
  Loading,
  TimeField,
} from '@soundwaves/components';
import { format, parse, parseISO } from 'date-fns';
import { useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScheduleItem } from '@/graphql/__generated__/graphql';
import { UPDATE_SCHEDULE_ITEM } from '@/graphql/mutations/updateScheduleItem';
import { toast } from '@/lib';

import { ItemSelector } from '../ItemSelector';
import { PrimarySecondary } from '../PrimarySecondary';

export type ScheduleItemSelectorProps = {
  item: Pick<ScheduleItem, 'id' | 'start' | 'end'>;
};

const schema = z.object({
  start: z.date(),
  end: z.date(),
});

export const ScheduleItemSelector = ({ item }: ScheduleItemSelectorProps) => {
  const [updateScheduleItem, { loading }] = useMutation(UPDATE_SCHEDULE_ITEM);
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      start: parseISO(item.start, { in: utc }),
      end: parseISO(item.end, { in: utc }),
    },
    resolver: zodResolver(schema),
  });
  const id = useId();

  const handleSave = (values: z.infer<typeof schema>) => {
    updateScheduleItem({
      variables: {
        input: {
          id: item.id.toString(),
          start: values.start.toISOString(),
          end: values.end.toISOString(),
        },
      },
      onCompleted: () => {
        toast('Schedule item saved', 'success');
        setOpen(false);
      },
      onError: (error) => {
        toast('There was an error saving schedule item', 'error');
        console.error(error);
      },
    });
  };
  const handleInvalid = () => {
    toast(`There were issues saving schedule item`, 'error');
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };
  return (
    <ItemSelector
      open={open}
      trigger={
        <div className="primary-secondary-list">
          <PrimarySecondary
            primary={format(item.start, 'HH:mm:ss', { in: utc })}
            secondary={format(item.start, 'dd/MM/yyyy', { in: utc })}
          />
          <p>-</p>
          <PrimarySecondary
            primary={format(item.end, 'HH:mm:ss', { in: utc })}
            secondary={format(item.end, 'dd/MM/yyyy', { in: utc })}
          />
        </div>
      }
      content={
        <div className="schedule-item-editor">
          <div className="schedule-item-editor__row">
            <p
              className="schedule-item-editor__row-label"
              id={`${id}-start-label`}
            >
              Start
            </p>
            <Controller
              control={control}
              name="start"
              render={({ field, fieldState }) => {
                const { onChange, value: currentValue, ...rest } = field;
                return (
                  <DatePicker
                    aria-labelledby={`${id}-start-label`}
                    {...rest}
                    value={currentValue}
                    errorMessage={fieldState.error?.message}
                    onChange={(value) => {
                      if (value) {
                        const newDate = parse(
                          value.toString(),
                          'yyyy-MM-dd',
                          new Date(),
                          { in: utc },
                        );
                        newDate.setHours(currentValue.getHours());
                        newDate.setMinutes(currentValue.getMinutes());
                        newDate.setSeconds(currentValue.getSeconds());
                        onChange(newDate);
                      }
                    }}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="start"
              render={({ field, fieldState }) => {
                const { onChange, value: currentValue, ...rest } = field;
                return (
                  <TimeField
                    aria-labelledby={`${id}-start-label`}
                    locale="en-GB"
                    {...rest}
                    value={format(currentValue, 'HH:mm:ss', { in: utc })}
                    onChange={(value) => {
                      if (value) {
                        onChange(
                          parse(value, 'HH:mm:ss', currentValue, { in: utc }),
                        );
                      }
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          </div>
          <div className="schedule-item-editor__row">
            <p
              className="schedule-item-editor__row-label"
              id={`${id}-end-label`}
            >
              End
            </p>
            <Controller
              control={control}
              name="end"
              render={({ field, fieldState }) => {
                const { onChange, value: currentValue, ...rest } = field;

                return (
                  <DatePicker
                    aria-labelledby={`${id}-end-label`}
                    {...rest}
                    value={currentValue}
                    onChange={(value) => {
                      if (value) {
                        const newDate = parse(
                          value.toString(),
                          'yyyy-MM-dd',
                          new Date(),
                          { in: utc },
                        );
                        newDate.setHours(currentValue.getHours());
                        newDate.setMinutes(currentValue.getMinutes());
                        newDate.setSeconds(currentValue.getSeconds());
                        onChange(newDate);
                      }
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="end"
              render={({ field, fieldState }) => {
                const { onChange, value: currentValue, ...rest } = field;
                return (
                  <TimeField
                    aria-labelledby={`${id}-end-label`}
                    locale="en-GB"
                    {...rest}
                    value={format(currentValue, 'HH:mm:ss', { in: utc })}
                    onChange={(value) => {
                      if (value) {
                        onChange(
                          parse(value, 'HH:mm:ss', currentValue, { in: utc }),
                        );
                      }
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          </div>

          <div className="schedule-item-editor__actions">
            <Button variant="transparent" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleSubmit(handleSave, handleInvalid)()}
              after={loading ? <Loading size="xxs" /> : undefined}
              disabled={loading}
            >
              Save
            </Button>
          </div>
        </div>
      }
      icon={<CalendarEditIcon />}
      onOpenChange={handleOpenChange}
    />
  );
};
