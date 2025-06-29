'use client';

import { Button, DropdownMenu } from '@soundwaves/components';
import Link from 'next/link';
import { Fragment } from 'react';

import { PageHeader, EpisodesTable } from '@/components';
import { ChevronDownIcon } from '@/components/icons';
import { useNavigation } from '@/hooks';

export const EpisodesPage = () => {
  const { getNetworkRoutePath } = useNavigation();

  return (
    <Fragment>
      <PageHeader
        heading="Episodes"
        subheading="Add episodes for shows to go out on air"
        actions={
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <Button variant="outline" size="sm" after={<ChevronDownIcon />}>
                  More options
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end" style={{ zIndex: 5 }}>
                <DropdownMenu.Item>Export episodes</DropdownMenu.Item>
                <DropdownMenu.Item>Import episodes</DropdownMenu.Item>
                <DropdownMenu.Item>Bulk actions</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
            <Button size="sm" asChild>
              <Link href={getNetworkRoutePath('createEpisode')}>
                Add Episode
              </Link>
            </Button>
          </div>
        }
      />
      <div className="page-content">
        <EpisodesTable />
      </div>
    </Fragment>
  );
};
