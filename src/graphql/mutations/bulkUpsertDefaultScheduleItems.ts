import { gql } from '../__generated__';

export const BULK_UPSERT_DEFAULT_SCHEDULE_ITEMS = gql(`
  mutation BulkUpsertDefaultScheduleItems($input: BulkUpsertDefaultScheduleItemsInput!) {
    bulkUpsertDefaultScheduleItems(input: $input) {
      success
      successCount
      failureCount
      totalItems
      upsertedItems {
        id
        start
        end
        endsNextDay
        episodeName
        episodeDesc
        show {
          id
          shortName
        }
        series {
          id
          shortName
        }
        presenters {
          id
          name
        }
        networks {
          id
          name
        }
        existingEpisode {
          id
          name
        }
        repeatOf {
          id
        }
      }
      failedItems {
        id
        error
      }
    }
  }
`);