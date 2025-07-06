'use client';

import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';

import { JobsTable } from '@/blocks/JobsTable/JobsTable';
import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { JobStatus } from '@/graphql/__generated__/graphql';
import { CANCEL_JOB } from '@/graphql/mutations/downloadJobs';
import { GET_JOBS } from '@/graphql/queries/jobs';
import { toast } from '@/lib/toast';

export function JobsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'ALL'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, refetch } = useQuery(GET_JOBS, {
    variables: {
      limit: 25,
      status: statusFilter !== 'ALL' ? statusFilter : undefined,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [cancelJob] = useMutation(CANCEL_JOB);
  // const [enrichPendingJob] = useMutation(ENRICH_PENDING_JOB);

  const jobs = data?.jobs || [];

  // Auto-refresh every 5 seconds for active jobs
  useEffect(() => {
    const hasActiveJobs = jobs.some((job) =>
      [JobStatus.Pending, JobStatus.Processing].includes(job.status),
    );

    if (hasActiveJobs) {
      const interval = setInterval(() => {
        refetch();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [jobs, refetch]);

  const handleCancel = async (jobId: string) => {
    try {
      await cancelJob({
        variables: {
          id: jobId,
        },
      });

      toast('Job cancelled successfully', 'success');

      refetch();
    } catch (error) {
      toast('Failed to cancel job', 'error');
      console.error('Cancel job error:', error);
    }
  };

  const handleEnrich = (jobId: string) => {
    // Find the job to get context
    const job = jobs.find(j => j.id === jobId);
    
    if (job && job.songId) {
      // Navigate to enrich tracks page with track ID context
      router.push(`/tracks/enrich?trackId=${job.songId}`);
      toast('Opened enrich page for the specific track', 'info');
    } else {
      // Fallback to general enrich page
      router.push('/tracks/enrich');
      toast('Opened enrich tracks page', 'info');
    }
  };

  const handleRefresh = () => {
    refetch();
    toast('Jobs list has been refreshed', 'success');
  };

  const hasActiveJobs = jobs.some((job) =>
    [JobStatus.Pending, JobStatus.Processing].includes(job.status),
  );

  return (
    <Fragment>
      <PageHeader
        heading="Jobs Status"
        subheading={`Download and enrichment jobs${
          hasActiveJobs ? ' (Auto-refreshing)' : ''
        }`}
        actions={
          <Button onClick={handleRefresh} variant="outline">
            Refresh
          </Button>
        }
      />
      <div className="page-content">
        <JobsTable
          jobs={jobs}
          loading={loading}
          onCancel={handleCancel}
          onEnrich={handleEnrich}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          totalCount={jobs.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Fragment>
  );
}
