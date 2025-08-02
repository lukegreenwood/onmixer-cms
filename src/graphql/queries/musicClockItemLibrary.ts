import { gql } from '@/graphql/__generated__';

export const GET_MUSIC_CLOCK_ITEM_LIBRARY = gql(`
  query GetMusicClockItemLibrary($networkId: ID!, $type: MusicClockLibraryItemType) {
    musicClockItemLibrary(networkId: $networkId, type: $type) {
      items {
        id
        name
        type
        createdAt
        updatedAt
        ... on LibraryNoteClockItem {
          content
          color
        }
        ... on LibraryAdBreakClockItem {
          duration
          scheduledStartTime
        }
        ... on LibraryCommandClockItem {
          command
        }
      }
    }
  }
`);