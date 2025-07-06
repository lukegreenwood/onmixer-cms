import { gql } from '@apollo/client';

export const CREATE_ENRICHMENT_JOB = gql(`
  mutation CreateEnrichmentJob($input: EnrichmentJobInput!) {
    createEnrichmentJob(input: $input) {
      id
      status
      progress
      createdAt
    }
  }
`);

export const ENRICH_PENDING_JOB = gql(`
  mutation EnrichPendingJob($input: EnrichPendingJobInput!) {
    enrichPendingJob(input: $input) {
      id
      status
      progress
      updatedAt
    }
  }
`);

export const RETRY_JOB = gql(`
  mutation RetryJob($id: ID!) {
    retryJob(id: $id) {
      id
      status
      progress
      updatedAt
    }
  }
`);
