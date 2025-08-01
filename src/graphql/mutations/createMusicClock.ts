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
          ...TrackClockItemFragment
          ...SubcategoryClockItemFragment
          ...GenreClockItemFragment
          ...NoteClockItemFragment
        }
        network {
          id
          name
        }
      }
    }
  }
  
  fragment TrackClockItemFragment on TrackClockItem {
    id
    clockId
    orderIndex
    duration
    name
    createdAt
    updatedAt
    trackId
    track {
      id
      title
      artist
      duration {
        formatted
      }
      album
    }
  }
  
  fragment SubcategoryClockItemFragment on SubcategoryClockItem {
    id
    clockId
    orderIndex
    duration
    name
    createdAt
    updatedAt
    subcategoryId
    subcategory {
      id
      name
    }
    averageDuration
  }
  
  fragment GenreClockItemFragment on GenreClockItem {
    id
    clockId
    orderIndex
    duration
    name
    createdAt
    updatedAt
    genreId
    genre {
      id
      name
    }
    averageDuration
  }
  
  fragment NoteClockItemFragment on NoteClockItem {
    id
    clockId
    orderIndex
    duration
    name
    createdAt
    updatedAt
    content
    color
  }
`);
