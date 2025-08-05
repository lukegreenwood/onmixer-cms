import { gql } from '../__generated__';

export const GET_MUSIC_CLOCKS = gql(/* GraphQL */ `
  query GetMusicClocks($networkId: ID!, $filters: MusicClockFilters) {
    musicClocks(networkId: $networkId, filters: $filters) {
      id
      name
      description
      color
      targetRuntime
      network {
        id
        name
        logoSvgIcon
      }
      createdAt
      updatedAt
      items {
        ... on ClockItemInterface {
          id
          clockId
          createdAt
          duration
          orderIndex
          updatedAt
        }
      }
    }
  }
`);

export const GET_MUSIC_CLOCK = gql(/* GraphQL */ `
  query GetMusicClock($id: ID!) {
    musicClock(id: $id) {
      id
      name
      description
      color
      targetRuntime
      network {
        id
        name
      }
      createdAt
      updatedAt
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
            color
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
`);
