import { gql } from '../__generated__';

export const DUPLICATE_SCHEDULE_TEMPLATE = gql(`
  mutation DuplicateScheduleTemplate($input: DuplicateDefaultScheduleInput!) {
    duplicateDefaultSchedule(input: $input) {
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