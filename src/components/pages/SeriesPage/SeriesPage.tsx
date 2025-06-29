'use client';

import { Fragment } from 'react';

import { PageHeader, SeriesTable } from '@/components';

export const SeriesPage = () => {
  return (
    <Fragment>
      <PageHeader
        heading="Series"
        subheading="Collections of related episodes within shows"
      />
      <div className="page-content">
        <SeriesTable />
      </div>
    </Fragment>
  );
};
