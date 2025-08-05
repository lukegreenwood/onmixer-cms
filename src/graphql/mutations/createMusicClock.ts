import { gql } from '../__generated__';

export const CREATE_MUSIC_CLOCK = gql(/* GraphQL */ `
  mutation CreateMusicClock($input: CreateMusicClockInput!) {
    createMusicClock(input: $input) {
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
          ... on ClockItemInterface {
            id
            clockId
            createdAt
            duration
            orderIndex
            updatedAt
          }
          ... on TrackClockItem {
            track {
              id
              title
              artist
            }
          }
          ... on SubcategoryClockItem {
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
            genre {
              id
              name
            }
          }
          ... on NoteClockItem {
            label
            content
          }
          ... on AdBreakClockItem {
            scheduledStartTime
          }
          ... on CommandClockItem {
            command
          }
          ... on LibraryNoteClockItem {
            note {
              id
              duration
              label
              content
            }
          }
          ... on LibraryAdBreakClockItem {
            adBreak {
              id
              duration
              scheduledStartTime
            }
          }
          ... on LibraryCommandClockItem {
            libraryCommand: command {
              id
              duration
              command
            }
          }
        }
      }
    }
  }
`);
