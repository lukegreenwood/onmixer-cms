import { gql } from '@/graphql/__generated__';

export const CREATE_MUSIC_CLOCK_LIBRARY_ITEM = gql(`
  mutation CreateMusicClockLibraryItem($input: CreateMusicClockLibraryItemInput!) {
    createMusicClockLibraryItem(input: $input) {
      success
      message
      item {
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

export const UPDATE_MUSIC_CLOCK_LIBRARY_ITEM = gql(`
  mutation UpdateMusicClockLibraryItem($input: UpdateMusicClockLibraryItemInput!) {
    updateMusicClockLibraryItem(input: $input) {
      success
      message
      item {
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

export const DELETE_MUSIC_CLOCK_LIBRARY_ITEM = gql(`
  mutation DeleteMusicClockLibraryItem($id: ID!) {
    deleteMusicClockLibraryItem(id: $id) {
      success
      message
    }
  }
`);