'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CalendarEditIcon,
  DatePicker,
  Popover,
  TimeField,
} from '@soundwaves/components';
import { format, parse, parseISO } from 'date-fns';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScheduleItem } from '@/graphql/__generated__/graphql';
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
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      start: parseISO(item.start),
      end: parseISO(item.end),
    },
    resolver: zodResolver(schema),
  });
  const id = useId();

  const handleSave = (values: z.infer<typeof schema>) => {
    console.log('save', values);
    toast('Schedule item saved', 'success');
  };

  const handleInvalid = () => {
    toast(`There were issues saving schedule item`, 'error');
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <ItemSelector
      trigger={
        <div className="primary-secondary-list">
          <PrimarySecondary
            primary={format(item.start, 'HH:mm')}
            secondary={format(item.start, 'dd/MM/yyyy')}
          />
          <p>-</p>
          <PrimarySecondary
            primary={format(item.end, 'HH:mm')}
            secondary={format(item.end, 'dd/MM/yyyy')}
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
                    value={format(currentValue, 'HH:mm:ss')}
                    onChange={(value) => {
                      if (value) {
                        onChange(parse(value, 'HH:mm:ss', currentValue));
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
                    value={format(currentValue, 'HH:mm:ss')}
                    onChange={(value) => {
                      if (value) {
                        onChange(parse(value, 'HH:mm:ss', currentValue));
                      }
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          </div>

          <div className="schedule-item-editor__actions">
            <Popover.Close asChild>
              <Button variant="transparent" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </Popover.Close>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleSubmit(handleSave, handleInvalid)()}
            >
              Save
            </Button>
          </div>
        </div>
      }
      icon={<CalendarEditIcon />}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel();
        }
      }}
    />
  );
};
