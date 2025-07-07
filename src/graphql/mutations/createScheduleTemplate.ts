import { gql } from '../__generated__';

export const CREATE_SCHEDULE_TEMPLATE = gql(`
  mutation CreateScheduleTemplate($input: CreateDefaultScheduleInput!) {
    createDefaultSchedule(input: $input) {
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