'use client';

import {
  Alert,
  Button,
  ButtonGroup,
  DropdownMenu,
} from '@soundwaves/components';
import { format, isValid, parse } from 'date-fns';
import { Fragment } from 'react';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PageHeader,
} from '@/components';
import { useNetwork, useSchedule } from '@/hooks';

interface SchedulePageProps {
  date: string;
}

const getDateFromParams = (date: string) => {
  try {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

    if (isValid(parsedDate)) {
      return parsedDate;
    }

    const fallbackParsedDate = parse(date, 'dd-MM-yyyy', new Date());

    if (isValid(fallbackParsedDate)) {
      return fallbackParsedDate;
    }

    return undefined;
  } catch (error) {
    console.error('Could not get date from params', error);
  }
  return undefined;
};

export const SchedulePage = ({ date }: SchedulePageProps) => {
  const scheduleDate = getDateFromParams(date);
  const { currentNetwork } = useNetwork();
  const { data: schedule, error } = useSchedule({
    date: scheduleDate?.toISOString(),
    networkId: currentNetwork?.id,
  });

  console.log(schedule);
  if (!scheduleDate) {
    return (
      <Alert
        variant="expanded"
        color="error"
        title="Could not get schedule for date"
      >
        Please check the date provided is in the format YYYY-MM-DD or DD-MM-YYYY
        or go back to today by clicking schedule from the menu to the left.
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert variant="expanded" color="error" title="Error fetching schedule">
        {error.message}
      </Alert>
    );
  }

  return (
    <Fragment>
      <PageHeader
        heading="Schedule"
        subheading="The stuff that goes out on air on"
        actions={
          <Fragment>
            <ButtonGroup size="md">
              <ButtonGroup.Item isIconOnly before={<ChevronLeftIcon />} />
              <ButtonGroup.Item>
                {format(scheduleDate, 'dd/MM/yyyy')}
              </ButtonGroup.Item>
              <ButtonGroup.Item isIconOnly after={<ChevronRightIcon />} />
            </ButtonGroup>

            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline" after={<ChevronDownIcon />}>
                  More options
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  <DropdownMenu.Item>Item 1</DropdownMenu.Item>
                  <DropdownMenu.Item>Item 2</DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu>
          </Fragment>
        }
      />
    </Fragment>
  );
};
