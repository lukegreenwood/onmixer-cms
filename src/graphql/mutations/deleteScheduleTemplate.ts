import { gql } from '../__generated__';

export const DELETE_SCHEDULE_TEMPLATE = gql(`
  mutation DeleteScheduleTemplate($input: DeleteDefaultScheduleInput!) {
    deleteDefaultSchedule(input: $input) {
      success
      message
    }
  }
`);