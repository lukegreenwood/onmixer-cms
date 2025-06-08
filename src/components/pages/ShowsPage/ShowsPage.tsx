'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Alert, Button } from '@soundwaves/components';
import Link from 'next/link';
import { Fragment } from 'react';

import { PageHeader } from '@/components/blocks';
import { SEARCH_SHOWS } from '@/graphql/queries';
import { useNavigation } from '@/hooks';

export const ShowsPage = () => {
  const { getNetworkRoutePath } = useNavigation();
  const { data, error } = useSuspenseQuery(SEARCH_SHOWS);

  console.log(data);

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching shows">
          {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <Fragment>
      <PageHeader
        heading="Schedule"
        subheading="The main brands for a network"
        actions={
          <Button asChild>
            <Link href={getNetworkRoutePath('shows/new')}>Create show</Link>
          </Button>
        }
      />
      <div className="page-content"></div>
    </Fragment>
  );
};
