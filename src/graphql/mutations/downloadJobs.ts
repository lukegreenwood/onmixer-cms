import { gql } from '@apollo/client';

export const CREATE_DOWNLOAD_JOB = gql(`
  mutation CreateDownloadJob($input: DownloadJobInput!) {
    createDownloadJob(input: $input) {
      id
      status
      sourceUrl
      searchQuery
      createdAt
    }
  }
`);

export const CREATE_BULK_DOWNLOAD_JOBS = gql(`
  mutation CreateBulkDownloadJobs($input: BulkDownloadJobsInput!) {
    createBulkDownloadJobs(input: $input) {
      success
      message
      results {
        id
        url
        jobId
        success
        error
      }
      totalJobs
      successfulJobs
      failedJobs
    }
  }
`);

export const CANCEL_JOB = gql(`
  mutation CancelJob($id: ID!) {
    cancelJob(id: $id)
  }
`);