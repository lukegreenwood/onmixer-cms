'use client';
import { DatePicker, TimeField } from '@soundwaves/components';
import { format, parse, parseISO } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

import { ScheduleItem } from '@/graphql/__generated__/graphql';

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

  return (
    <div className="schedule-item-editor">
      <div className="schedule-item-editor__row">
        <p className="schedule-item-editor__row-label">Start</p>
        <Controller
          control={control}
          name="start"
          render={({ field }) => {
            const { onChange, value: currentValue, ...rest } = field;
            console.log(
              currentValue instanceof Date,
              typeof currentValue,
              currentValue,
            );
            return (
              <DatePicker
                {...rest}
                // value={currentValue}
                onChange={(value) => {
                  if (value) {
                    onChange(
                      parse(value.toString(), 'yyyy-MM-dd', currentValue),
                    );
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
        <p className="schedule-item-editor__row-label">End</p>
        {/* <Input placeholder="End Date yyyy-MM-dd" {...register('endDate')} />
        <Input placeholder="End Time HH:mm" {...register('endTime')} /> */}
      </div>
    </div>
  );
};
