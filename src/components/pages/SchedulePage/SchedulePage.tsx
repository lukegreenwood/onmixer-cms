'use client';

import { utc } from '@date-fns/utc';
import { Alert, Button, DropdownMenu, Tooltip } from '@soundwaves/components';
import { format, isValid, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

import { PageHeader, DataTable } from '@/blocks';
import {
  ApplyScheduleTemplateModal,
  ScheduleExistingEpisodeModal,
} from '@/components';
import { useNetwork, useSchedule } from '@/hooks';
import { ChevronDownIcon, CopyIcon } from '@/icons';

import { DateNavigation } from './DateNavigation';
import { columns } from './tableColumns';

interface SchedulePageProps {
  date: string;
}

const getDateFromParams = (date: string) => {
  try {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), {
      in: utc,
    });

    if (isValid(parsedDate)) {
      return parsedDate;
    }

    const fallbackParsedDate = parse(date, 'dd-MM-yyyy', new Date(), {
      in: utc,
    });

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
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const { currentNetwork } = useNetwork();
  const { data, error } = useSchedule({
    date: scheduleDate,
    networkId: currentNetwork?.id,
  });

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

  const handleDateChange = (newDate: Date) => {
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    router.push(`/networks/${currentNetwork?.code}/schedule/${formattedDate}`);
  };

  return (
    <Fragment>
      <PageHeader
        heading="Schedule"
        subheading="The stuff that goes out on air on"
        actions={
          <Fragment>
            <DateNavigation
              scheduleDate={scheduleDate}
              onDateChange={handleDateChange}
            />
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline" after={<ChevronDownIcon />}>
                  More options
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content style={{ zIndex: 2 }}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setTimeout(() => {
                      setShowScheduleModal(true);
                    }, 1);
                  }}
                >
                  Schedule an existing episode
                </DropdownMenu.Item>
                <DropdownMenu.Item>Schedule a new episode</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
            <Tooltip
              content="Duplicate current days schedule"
              color="secondary"
            >
              <Button variant="outline" isIconOnly before={<CopyIcon />} />
            </Tooltip>
            <Button onClick={() => setShowTemplateModal(true)}>
              Apply schedule template
            </Button>
          </Fragment>
        }
      />
      <div className="page-content">
        {data?.schedule.items && (
          <DataTable data={data.schedule.items} columns={columns} />
        )}
      </div>

      <ScheduleExistingEpisodeModal
        scheduleDate={scheduleDate}
        networkId={currentNetwork?.id || ''}
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
      />

      {showTemplateModal && (
        <ApplyScheduleTemplateModal
          scheduleDate={scheduleDate}
          networkId={currentNetwork?.id || ''}
          open={showTemplateModal}
          onOpenChange={setShowTemplateModal}
        />
      )}
    </Fragment>
  );
};
