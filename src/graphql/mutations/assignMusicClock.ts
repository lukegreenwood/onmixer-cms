import { gql } from '../__generated__';

export const ASSIGN_MUSIC_CLOCK = gql(`
  mutation AssignMusicClock($input: AssignMusicClockInput!) {
    assignMusicClock(input: $input) {
      assignment {
        id
        clock {
          id
          name
          targetRuntime
        }
        dayOfWeek
        hour
        priority
        isTemplate
        network {
          id
          name
        }
      }
    }
  }
`);

export const START_MUSIC_SCHEDULING_JOB = gql(`
  mutation StartMusicSchedulingJob($input: StartMusicSchedulingJobInput!) {
    startMusicSchedulingJob(input: $input) {
      job {
        id
        status
        type
        progress
        createdAt
      }
    }
  }
`);