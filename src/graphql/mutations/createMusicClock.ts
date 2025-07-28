import { gql } from '../__generated__';

export const CREATE_MUSIC_CLOCK = gql(`
  mutation CreateMusicClock($input: CreateMusicClockInput!) {
    createMusicClock(input: $input) {
      success
      message
      clock {
        id
        shortId
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
      }
    }
  }
`);