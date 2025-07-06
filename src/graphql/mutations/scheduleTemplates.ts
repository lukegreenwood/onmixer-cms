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

export const DELETE_SCHEDULE_TEMPLATE = gql(`
  mutation DeleteScheduleTemplate($input: DeleteDefaultScheduleInput!) {
    deleteDefaultSchedule(input: $input) {
      success
      message
    }
  }
`);