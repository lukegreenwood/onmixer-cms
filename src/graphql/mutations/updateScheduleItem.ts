import { gql } from '../__generated__';

export const UPDATE_SCHEDULE_ITEM = gql(`
  mutation UpdateScheduleItem($input: UpdateScheduleItemInput!) {
    updateScheduleItem(input: $input) {
      scheduleItem {
        id
        end
        start
        networks {
          id
          name
        }
      }
    }
  }
`);
