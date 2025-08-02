import { gql } from '../__generated__';

export const UPDATE_MUSIC_CLOCK = gql(/* GraphQL */ `
  mutation UpdateMusicClock($input: UpdateMusicClockInput!) {
    updateMusicClock(input: $input) {
      success
      message
      clock {
        id
        name
        description
        color
        targetRuntime
        network {
          id
          name
        }
        items {
          ... on TrackClockItem {
            ...CommonClockItemFields
            track {
              id
              title
            }
          }
          ... on SubcategoryClockItem {
            ...CommonClockItemFields
            subcategory {
              id
              name
              category {
                id
                name
              }
            }
          }
          ... on GenreClockItem {
            ...CommonClockItemFields
            genre {
              id
              name
            }
          }
          ... on NoteClockItem {
            ...CommonClockItemFields
            label
            content
          }
          ... on AdBreakClockItem {
            ...CommonClockItemFields
            scheduledStartTime
          }
          ... on CommandClockItem {
            ...CommonClockItemFields
            command
          }
        }
      }
    }
  }

  fragment CommonClockItemFields on ClockItemInterface {
    id
    clockId
    createdAt
    duration
    orderIndex
    updatedAt
  }
`);
