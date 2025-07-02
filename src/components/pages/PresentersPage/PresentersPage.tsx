'use client';

import { Button } from '@soundwaves/components';
import Link from 'next/link';
import { Fragment } from 'react';

import { PageHeader, PresentersTable } from '@/components';
import { useNavigation } from '@/hooks';

export const PresentersPage = () => {
  const { getNetworkRoutePath } = useNavigation();

  return (
    <Fragment>
      <PageHeader
        heading="Presenters"
        subheading="People who present shows and episodes"
        actions={
          <Button asChild>
            <Link href={getNetworkRoutePath('createPresenter')}>
              Create presenter
            </Link>
          </Button>
        }
      />
      <div className="page-content">
        <PresentersTable />
      </div>
    </Fragment>
  );
};
