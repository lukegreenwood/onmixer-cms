import { gql } from '../__generated__';

export const DELETE_SCHEDULE_ITEM = gql(`
  mutation DeleteScheduleItem($input: DeleteScheduleItemInput!) {
    deleteScheduleItem(input: $input) {
        success
    }
  }
`);
