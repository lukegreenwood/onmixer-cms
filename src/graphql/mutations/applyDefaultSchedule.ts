import { gql } from '@apollo/client';

export const APPLY_DEFAULT_SCHEDULE = gql`
  mutation ApplyDefaultSchedule($defaultScheduleId: ID!, $date: DateTime!) {
    applyDefaultSchedule(
      input: { defaultSchedule: $defaultScheduleId, date: $date }
    ) {
      success
      message
    }
  }
`;
