import { gql } from '../__generated__';

export const ASSIGN_DEFAULT_SCHEDULE_TO_NETWORK = gql(`
  mutation AssignDefaultScheduleToNetwork($input: AssignDefaultScheduleToNetworkInput!) {
    assignDefaultScheduleToNetwork(input: $input) {
      success
      message
    }
  }
`);