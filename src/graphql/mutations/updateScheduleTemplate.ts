import { gql } from '../__generated__';

export const UPDATE_SCHEDULE_TEMPLATE = gql(`
  mutation UpdateScheduleTemplate($input: UpdateDefaultScheduleInput!) {
    updateDefaultSchedule(input: $input) {
      defaultSchedule {
        id
        name
        assignedTo
        networks {
          id
          name
          code
        }
      }
    }
  }
`);