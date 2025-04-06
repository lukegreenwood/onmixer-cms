'use client';

import { CalendarEditIcon } from '@soundwaves/components';
import { format } from 'date-fns';

import { ScheduleItem } from '@/graphql/__generated__/graphql';

import { ItemSelector } from '../ItemSelector';
import { PrimarySecondary } from '../PrimarySecondary';
import { ScheduleItemEditor } from '../ScheduleItemEditor/ScheduleItemEditor';

export type ScheduleItemSelectorProps = {
  item: Pick<ScheduleItem, 'id' | 'start' | 'end'>;
};

export const ScheduleItemSelector = ({ item }: ScheduleItemSelectorProps) => {
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
      content={<ScheduleItemEditor item={item} />}
      icon={<CalendarEditIcon />}
    />
  );
};
