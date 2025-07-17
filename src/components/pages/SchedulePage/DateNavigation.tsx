import { ButtonGroup, Calendar, Popover } from '@soundwaves/components';
import { format, subDays, addDays } from 'date-fns';

import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

interface DateNavigationProps {
  scheduleDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateNavigation = ({
  scheduleDate,
  onDateChange,
}: DateNavigationProps) => {
  return (
    <ButtonGroup size="md">
      <ButtonGroup.Item
        isIconOnly
        before={<ChevronLeftIcon />}
        onClick={() => {
          const prevDate = subDays(scheduleDate, 1);
          onDateChange(prevDate);
        }}
      />
      <Popover>
        <Popover.Trigger asChild>
          <ButtonGroup.Item>
            {format(scheduleDate, 'dd/MM/yyyy')}
          </ButtonGroup.Item>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content style={{ zIndex: 3 }}>
            <Calendar
              value={scheduleDate}
              onChange={(date) => {
                if (date) {
                  onDateChange(date.toDate('UTC'));
                }
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <ButtonGroup.Item
        isIconOnly
        after={<ChevronRightIcon />}
        onClick={() => {
          const nextDate = addDays(scheduleDate, 1);
          onDateChange(nextDate);
        }}
      />
    </ButtonGroup>
  );
};
