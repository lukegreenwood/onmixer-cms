import { gql } from '@/graphql/__generated__';

export const GET_MUSIC_CLOCK_ITEM_LIBRARY = gql(/* GraphQL */ `
  query GetMusicClockItemLibrary(
    $networkId: ID!
    $type: MusicClockLibraryItemType
  ) {
    musicClockItemLibrary(networkId: $networkId, type: $type) {
      items {
        ... on MusicClockLibraryItemInterface {
          id
          duration
          createdAt
          updatedAt
        }
        ... on MusicClockLibraryNote {
          label
          content
        }
        ... on MusicClockLibraryAdBreak {
          duration
          scheduledStartTime
        }
        ... on MusicClockLibraryCommand {
          command
        }
      }
    }
  }
`);
