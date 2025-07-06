import { Badge } from '@soundwaves/components';
import React from 'react';

import { Job, JobStatus } from '@/graphql/__generated__/graphql';

interface JobDetailsProps {
  job: Job;
}

export function JobDetails({ job }: JobDetailsProps) {
  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.Completed:
        return 'green';
      case JobStatus.Failed:
        return 'red';
      case JobStatus.Processing:
        return 'blue';
      case JobStatus.PendingEnrichment:
        return 'orange';
      case JobStatus.Cancelled:
        return 'gray';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="job-details">
      <div className="job-details__header">
        <h2 className="job-details__title">Job Details</h2>
        <Badge color={getStatusColor(job.status)} shape="rounded" size="md">
          {job.status.replace('_', ' ')}
        </Badge>
      </div>

      <div className="job-details__content">
        <div className="job-details__field">
          <div className="job-details__label">ID</div>
          <div className="job-details__value job-details__value--mono">
            {job.id}
          </div>
        </div>

        <div className="job-details__field">
          <div className="job-details__label">Type</div>
          <div className="job-details__value">
            <Badge color="gray" shape="rounded">
              {job.type}
            </Badge>
          </div>
        </div>

        {job.sourceUrl && (
          <div className="job-details__field">
            <div className="job-details__label">Source URL</div>
            <div className="job-details__value">
              <a
                href={job.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="job-details__link"
              >
                {job.sourceUrl}
              </a>
            </div>
          </div>
        )}

        {job.searchQuery && (
          <div className="job-details__field">
            <div className="job-details__label">Search Query</div>
            <div className="job-details__value">{job.searchQuery}</div>
          </div>
        )}

        <div className="job-details__field">
          <div className="job-details__label">Created At</div>
          <div className="job-details__value">{formatDate(job.createdAt)}</div>
        </div>

        <div className="job-details__field">
          <div className="job-details__label">Updated At</div>
          <div className="job-details__value">{formatDate(job.updatedAt)}</div>
        </div>

        {job.errorMessage && (
          <div className="job-details__field">
            <div className="job-details__label">Error</div>
            <div className="job-details__value job-details__value--error">
              {job.errorMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
