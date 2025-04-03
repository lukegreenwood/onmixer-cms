'use client';

import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  DropdownMenu,
} from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { format, isValid, parse, subDays, addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { ItemSelector, PrimarySecondary } from '@/components';
import { ScheduleQuery } from '@/graphql/__generated__/graphql';
import { useNetwork, useSchedule } from '@/hooks';
import { PageHeader, DataTable } from '@/blocks';
import {
  CalendarEditIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/icons';

interface SchedulePageProps {
  date: string;
}

type ScheduleItem = ScheduleQuery['schedule']['items'][0];
const columnHelper = createColumnHelper<ScheduleItem>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.accessor('episode', {
    header: 'Episode',
    cell: (props) => {
      const episode = props.getValue();
      return (
        <ItemSelector
          primaryText={episode.name}
          secondaryText={episode.show.shortName}
          content={<div>Selection component</div>}
        />
      );
    },
  }),
  columnHelper.accessor('start', {
    header: 'Broadcast Timings',
    cell: (props) => {
      const scheduleItem = props.row.original;
      return (
        <ItemSelector
          trigger={
            <div className="primary-secondary-list">
              <PrimarySecondary
                primary={format(scheduleItem.start, 'HH:mm')}
                secondary={format(scheduleItem.start, 'dd/MM/yyyy')}
              />
              <p>-</p>
              <PrimarySecondary
                primary={format(scheduleItem.end, 'HH:mm')}
                secondary={format(scheduleItem.end, 'dd/MM/yyyy')}
              />
            </div>
          }
          content={<div>Selection component</div>}
          icon={<CalendarEditIcon />}
        />
      );
    },
  }),
  columnHelper.display({
    id: 'networks',
    header: 'Networks',
    cell: (props) => {
      const networks = props.row.original.networks;
      return networks.map((network) => (
        <Badge
          key={network.id}
          color="blue"
          shape="rounded"
          size="md"
          before={
            <div
              style={{
                width: '16px',
                height: '16px',
              }}
              dangerouslySetInnerHTML={{
                __html: network.logoSvgIcon,
              }}
            />
          }
        >
          {network.name}
        </Badge>
      ));
    },
  }),
];

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
  const router = useRouter();

  const { currentNetwork } = useNetwork();
  const { data, error } = useSchedule({
    date: scheduleDate,
    networkId: currentNetwork?.id,
  });

  console.log(data);
  if (!scheduleDate) {
    return (
      <div className="page-content">
        <Alert
          variant="expanded"
          color="error"
          title="Could not get schedule for date"
        >
          Please check the date provided is in the format YYYY-MM-DD or
          DD-MM-YYYY or go back to today by clicking schedule from the menu to
          the left.
        </Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching schedule">
          {error.message}
        </Alert>
      </div>
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
              <ButtonGroup.Item
                isIconOnly
                before={<ChevronLeftIcon />}
                onClick={() => {
                  const prevDate = subDays(scheduleDate, 1);
                  const formattedDate = format(prevDate, 'yyyy-MM-dd');
                  router.push(
                    `/networks/${currentNetwork?.code}/schedule/${formattedDate}`,
                  );
                }}
              />
              <ButtonGroup.Item>
                {format(scheduleDate, 'dd/MM/yyyy')}
              </ButtonGroup.Item>
              <ButtonGroup.Item
                isIconOnly
                after={<ChevronRightIcon />}
                onClick={() => {
                  const nextDate = addDays(scheduleDate, 1);
                  const formattedDate = format(nextDate, 'yyyy-MM-dd');
                  router.push(
                    `/networks/${currentNetwork?.code}/schedule/${formattedDate}`,
                  );
                }}
              />
            </ButtonGroup>

            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline" after={<ChevronDownIcon />}>
                  More options
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content style={{ zIndex: 2 }}>
                <DropdownMenu.Group>
                  <DropdownMenu.Item>
                    Schedule an existing episode
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>Schedule a new episode</DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu>
            <Button variant="outline" isIconOnly before={<ChevronLeftIcon />} />
            <Button>Apply schedule template</Button>
          </Fragment>
        }
      />
      <div className="page-content">
        {data?.schedule.items && (
          <DataTable data={data.schedule.items} columns={columns} />
        )}
      </div>
    </Fragment>
  );
};
