'use client';
import { Button, DatePicker, Popover, TimeField } from '@soundwaves/components';
import { format, parse, parseISO } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

import { ScheduleItem } from '@/graphql/__generated__/graphql';
import { useId } from 'react';

export const ScheduleItemEditor = ({
  item,
}: {
  item: Pick<ScheduleItem, 'id' | 'start' | 'end'>;
}) => {
  const { control } = useForm({
    defaultValues: {
      start: parseISO(item.start),
      end: parseISO(item.end),
    },
  });
  const id = useId();

  return (
    <div className="schedule-item-editor">
      <div className="schedule-item-editor__row">
        <p className="schedule-item-editor__row-label" id={`${id}-start-label`}>
          Start
        </p>
        <Controller
          control={control}
          name="start"
          render={({ field }) => {
            const { onChange, value: currentValue, ...rest } = field;
            return (
              <DatePicker
                aria-labelledby={`${id}-start-label`}
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
              />
            );
          }}
        />
        <Controller
          control={control}
          name="start"
          render={({ field }) => {
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
              />
            );
          }}
        />
      </div>
      <div className="schedule-item-editor__row">
        <p className="schedule-item-editor__row-label" id={`${id}-end-label`}>
          End
        </p>
        <Controller
          control={control}
          name="end"
          render={({ field }) => {
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
              />
            );
          }}
        />
        <Controller
          control={control}
          name="end"
          render={({ field }) => {
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
              />
            );
          }}
        />
      </div>
      <div className="schedule-item-editor__row">
        <div />
        <div />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Popover.Close asChild>
            <Button variant="transparent" size="sm">
              Cancel
            </Button>
          </Popover.Close>
        </div>
      </div>
    </div>
  );
};
