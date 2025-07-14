import { gql } from '../__generated__';

export const BULK_DELETE_DEFAULT_SCHEDULE_ITEMS = gql(`
  mutation BulkDeleteDefaultScheduleItems($input: BulkDeleteDefaultScheduleItemsInput!) {
    bulkDeleteDefaultScheduleItems(input: $input) {
      success
      successCount
      failureCount
      totalItems
      deletedIds
      failedItems {
        id
        error
      }
    }
  }
`);