'use client';

import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React, { Fragment } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { JobDetails } from '@/components/blocks/JobDetails/JobDetails';
import { GET_JOB } from '@/graphql/queries/jobs';
import { toast } from '@/lib/toast';

export function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const { data, loading, error } = useQuery(GET_JOB, {
    variables: { id: jobId },
  });

  if (error) {
    toast('Failed to load job details', 'error');
  }

  return (
    <Fragment>
      <PageHeader
        heading="Job Details"
        subheading="View detailed information about a job"
      />
      <div className="page-content">
        {loading ? (
          <div className="jobs-table__loading">Loading job details...</div>
        ) : data?.job ? (
          <JobDetails job={data.job} />
        ) : (
          <div className="jobs-table__empty">Job not found</div>
        )}
      </div>
    </Fragment>
  );
}
