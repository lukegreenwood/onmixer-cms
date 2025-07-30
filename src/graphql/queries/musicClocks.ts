import { gql } from '../__generated__';

export const GET_MUSIC_CLOCKS = gql(`
  query GetMusicClocks($networkId: ID!, $filters: MusicClockFilters) {
    musicClocks(networkId: $networkId, filters: $filters) {
      id
      name
      description
      duration
      isTemplate
      items {
        ... on MusicSlot {
          id
          name
          duration
          categories
          genres
          musicPriority: priority
          allowOverrun
        }
        ... on NoteBlock {
          id
          name
          duration
          content
          notePriority: priority
          color
        }
        ... on AdBreak {
          id
          name
          duration
          adType
          isFixed
        }
        ... on StationIdent {
          id
          name
          duration
          identType
          trackId
        }
      }
      network {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);

export const GET_MUSIC_CLOCK = gql(`
  query GetMusicClock($id: ID!) {
    musicClock(id: $id) {
      id
      name
      description
      duration
      isTemplate
      items {
        ... on MusicSlot {
          id
          name
          duration
          categories
          genres
          musicPriority: priority
          allowOverrun
          orderIndex
        }
        ... on NoteBlock {
          id
          name
          duration
          content
          notePriority: priority
          color
          orderIndex
        }
        ... on AdBreak {
          id
          name
          duration
          adType
          isFixed
          orderIndex
        }
        ... on StationIdent {
          id
          name
          duration
          identType
          trackId
          orderIndex
        }
      }
      network {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);
