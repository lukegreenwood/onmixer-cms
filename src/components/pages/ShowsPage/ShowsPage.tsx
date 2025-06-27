'use client';

import { Button } from '@soundwaves/components';
import Link from 'next/link';
import { Fragment } from 'react';

import { PageHeader, ShowsTable } from '@/components';
import { useNavigation } from '@/hooks';

export const ShowsPage = () => {
  const { getNetworkRoutePath } = useNavigation();

  return (
    <Fragment>
      <PageHeader
        heading="Shows"
        subheading="The stuff that goes on air"
        actions={
          <Button asChild>
            <Link href={getNetworkRoutePath('newShow')}>Create show</Link>
          </Button>
        }
      />
      <div className="page-content">
        <ShowsTable />
      </div>
    </Fragment>
  );
};
