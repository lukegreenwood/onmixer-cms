import { gql } from '@/graphql/__generated__';

export const GET_JOBS = gql(`
  query GetJobs($limit: Int, $status: JobStatus, $type: JobType) {
    jobs(limit: $limit, status: $status, type: $type) {
      id
      type
      status
      sourceUrl
      searchQuery
      progress
      errorMessage
      songId
      createdAt
      updatedAt
      completedAt
    }
  }
`);

export const GET_JOB = gql(`
  query GetJob($id: ID!) {
    job(id: $id) {
      id
      type
      status
      sourceUrl
      searchQuery
      progress
      errorMessage
      songId
      createdAt
      updatedAt
      completedAt
    }
  }
`);
