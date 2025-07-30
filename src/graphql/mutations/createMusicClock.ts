import { gql } from '../__generated__';

export const CREATE_MUSIC_CLOCK = gql(`
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
        networkId
        items {
          id
          itemType
          itemId
          noteContent
          orderIndex
          duration
          name
          # Resolved references
          track {
            id
            title
            artist
            duration
          }
          subcategory {
            id
            name
            averageDuration
          }
          genre {
            id
            name
            averageDuration
          }
        }
        network {
          id
          name
        }
      }
    }
  }
`);
