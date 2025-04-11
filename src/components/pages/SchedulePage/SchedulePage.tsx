'use client';

import {
  Alert,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  DropdownMenu,
  HoverCard,
  Popover,
  Tooltip,
} from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { format, isValid, parse, subDays, addDays } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { PageHeader, DataTable } from '@/blocks';
import {
  ItemSelector,
  NetworksSelectorList,
  ScheduleItemSelector,
} from '@/components';
import { ScheduleQuery } from '@/graphql/__generated__/graphql';
import { useNetwork, useSchedule } from '@/hooks';
import {
  BroadcastsIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
} from '@/icons';
import { getRoutePath } from '@/lib';
import { pluralize } from '@/utils';

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
        <div className="flex flex--row flex--justify-between">
          <ItemSelector
            primaryText={episode.name}
            secondaryText={episode.show.shortName}
            content={<div>Selection component</div>}
          />
          <HoverCard>
            <HoverCard.Trigger asChild>
              <Badge color="gray" shape="rounded" size="md">
                {episode.id}
              </Badge>
            </HoverCard.Trigger>
            <HoverCard.Content asChild>
              <div className="item-preview">
                <div className="item-preview__meta">
                  <div className="item-preview__image">
                    <img
                      src={
                        props.row.original.episode.featuredImage.urls
                          .customSquare ??
                        props.row.original.episode.featuredImage.urls.square
                      }
                      alt={props.row.original.episode.name}
                    />
                  </div>
                  <div className="item-preview__meta-items">
                    <Badge
                      color="pink"
                      shape="pill"
                      size="sm"
                      before={<BroadcastsIcon size={16} />}
                    >
                      {episode.broadcasts.length}{' '}
                      {pluralize(episode.broadcasts.length, 'Broadcast')}
                    </Badge>
                    {episode.networks.map((network) => (
                      <Avatar key={network.id} size="sm">
                        <Avatar.Fallback
                          dangerouslySetInnerHTML={{
                            __html: network.logoSvgIcon,
                          }}
                        />
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div className="item-preview__detail">
                  {episode.show.shortName}
                </div>
                <div className="item-preview__title">{episode.name}</div>
                <div className="item-preview__footer">
                  <div className="item-preview__description">
                    {episode.description}
                  </div>
                  <Button variant="tertiary" size="sm" asChild>
                    <Link href={getRoutePath('episodesEdit', [episode.id])}>
                      Edit
                    </Link>
                  </Button>
                </div>
                <HoverCard.Arrow />
              </div>
            </HoverCard.Content>
          </HoverCard>
        </div>
      );
    },
  }),
  columnHelper.accessor('start', {
    header: 'Broadcast Timings',
    cell: (props) => {
      const scheduleItem = props.row.original;
      return <ScheduleItemSelector item={scheduleItem} />;
    },
  }),
  columnHelper.display({
    id: 'networks',
    header: 'Networks',
    cell: (props) => {
      const networks = props.row.original.networks;
      return (
        <NetworksSelectorList id={props.row.original.id} networks={networks} />
      );
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
                        const formattedDate = format(
                          date.toDate('UTC'),
                          'yyyy-MM-dd',
                        );
                        router.push(
                          `/networks/${currentNetwork?.code}/schedule/${formattedDate}`,
                        );
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
            <Tooltip
              content="Duplicate current days schedule"
              color="secondary"
            >
              <Button variant="outline" isIconOnly before={<CopyIcon />} />
            </Tooltip>
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
