import { gql } from '@apollo/client';

export const APPLY_ASSIGNED_DEFAULT_SCHEDULE = gql`
  mutation ApplyAssignedDefaultSchedule(
    $networkId: ID!
    $date: DateTime!
    $assignedTo: [DayOfWeek!]!
  ) {
    applyAssignedDefaultSchedule(
      input: { networkId: $networkId, date: $date, assignedTo: $assignedTo }
    ) {
      success
      message
    }
  }
`;
