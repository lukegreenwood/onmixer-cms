'use client';

import { useQuery } from '@apollo/client';
import { Badge, Button, Dialog } from '@soundwaves/components';
import React from 'react';

import type { Job, JobStatus } from '@/graphql/__generated__/graphql';
import { GET_JOB } from '@/graphql/queries/jobs';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string | null;
}

export function JobDetailsModal({
  isOpen,
  onClose,
  jobId,
}: JobDetailsModalProps) {
  const { data, loading, error } = useQuery(GET_JOB, {
    variables: { id: jobId || '' },
    skip: !jobId,
  });

  const job = data?.job as Job | undefined;

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'green';
      case 'FAILED':
        return 'red';
      case 'PROCESSING':
        return 'blue';
      case 'PENDING_ENRICHMENT':
        return 'orange';
      case 'CANCELLED':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="job-details-modal">
        <Dialog.Title>Job Details</Dialog.Title>

        <div className="job-details-modal__body">
          {loading && (
            <div className="job-details-modal__loading">
              Loading job details...
            </div>
          )}

          {error && (
            <div className="job-details-modal__error">
              Error loading job details: {error.message}
            </div>
          )}

          {job && (
            <div className="job-details-modal__content">
              <div className="job-details-modal__field-group">
                <div className="job-details-modal__field">
                  <label>Job ID</label>
                  <span
                    className="job-details-modal__field-value"
                    title={job.id}
                  >
                    {job.id}
                  </span>
                </div>

                <div className="job-details-modal__field">
                  <label>Type</label>
                  <Badge color="gray" shape="rounded">
                    {job.type}
                  </Badge>
                </div>

                <div className="job-details-modal__field">
                  <label>Status</label>
                  <Badge color={getStatusColor(job.status)} shape="rounded">
                    {job.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="job-details-modal__field-group">
                <div className="job-details-modal__field">
                  <label>Progress</label>
                  <div className="job-details-modal__progress">
                    <div className="job-details-modal__progress-bar">
                      <div
                        className="job-details-modal__progress-fill"
                        style={{ width: `50%` }}
                      />
                    </div>
                    <span className="job-details-modal__progress-text">
                      {JSON.stringify(job.progress)}
                    </span>
                  </div>
                </div>
              </div>

              {job.sourceUrl && (
                <div className="job-details-modal__field">
                  <label>Source URL</label>
                  <a
                    href={job.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="job-details-modal__link"
                  >
                    {job.sourceUrl}
                  </a>
                </div>
              )}

              {job.searchQuery && (
                <div className="job-details-modal__field">
                  <label>Search Query</label>
                  <span className="job-details-modal__field-value">
                    {job.searchQuery}
                  </span>
                </div>
              )}

              {job.songId && (
                <div className="job-details-modal__field">
                  <label>Song ID</label>
                  <span className="job-details-modal__field-value">
                    {job.songId}
                  </span>
                </div>
              )}

              {job.errorMessage && (
                <div className="job-details-modal__field">
                  <label>Error Message</label>
                  <div className="job-details-modal__error-message">
                    {JSON.stringify(job.errorMessage)}
                  </div>
                </div>
              )}

              <div className="job-details-modal__field-group">
                <div className="job-details-modal__field">
                  <label>Created At</label>
                  <span className="job-details-modal__field-value">
                    {formatDate(job.createdAt)}
                  </span>
                </div>

                <div className="job-details-modal__field">
                  <label>Updated At</label>
                  <span className="job-details-modal__field-value">
                    {formatDate(job.updatedAt)}
                  </span>
                </div>

                {job.completedAt && (
                  <div className="job-details-modal__field">
                    <label>Completed At</label>
                    <span className="job-details-modal__field-value">
                      {formatDate(job.completedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="job-details-modal__footer">
          <Dialog.Close asChild>
            <Button variant="secondary">Close</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
