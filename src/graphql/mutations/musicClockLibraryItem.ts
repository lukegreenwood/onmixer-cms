import { gql } from '@/graphql/__generated__';

export const CREATE_MUSIC_CLOCK_LIBRARY_ITEM = gql(/* GraphQL */ `
  mutation CreateMusicClockLibraryItem(
    $input: CreateMusicClockLibraryItemInput!
  ) {
    createMusicClockLibraryItem(input: $input) {
      success
      message
      item {
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
          scheduledStartTime
        }
        ... on MusicClockLibraryCommand {
          command
        }
      }
    }
  }
`);

export const UPDATE_MUSIC_CLOCK_LIBRARY_ITEM = gql(/* GraphQL */ `
  mutation UpdateMusicClockLibraryItem(
    $input: UpdateMusicClockLibraryItemInput!
  ) {
    updateMusicClockLibraryItem(input: $input) {
      success
      message
      item {
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
          scheduledStartTime
        }
        ... on MusicClockLibraryCommand {
          command
        }
      }
    }
  }
`);

export const DELETE_MUSIC_CLOCK_LIBRARY_ITEM = gql(`
  mutation DeleteMusicClockLibraryItem($id: ID!) {
    deleteMusicClockLibraryItem(id: $id) {
      success
      message
    }
  }
`);
