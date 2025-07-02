'use client';

import { Button } from '@soundwaves/components';
import Link from 'next/link';
import { Fragment } from 'react';

import { PageHeader, SeriesTable } from '@/components';
import { useNavigation } from '@/hooks';

export const SeriesPage = () => {
  const { getNetworkRoutePath } = useNavigation();

  return (
    <Fragment>
      <PageHeader
        heading="Series"
        subheading="Collections of related episodes within shows"
        actions={
          <Button asChild>
            <Link href={getNetworkRoutePath('createSeries')}>
              Create series
            </Link>
          </Button>
        }
      />
      <div className="page-content">
        <SeriesTable />
      </div>
    </Fragment>
  );
};
