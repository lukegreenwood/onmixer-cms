import { gql } from '../__generated__';

export const GET_MUSIC_CLOCKS = gql(`
  query GetMusicClocks($networkId: ID!, $filters: MusicClockFilters) {
    musicClocks(networkId: $networkId, filters: $filters) {
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
      createdAt
      updatedAt
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

export const GET_MUSIC_CLOCK = gql(`
  query GetMusicClock($id: ID!) {
    musicClock(id: $id) {
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
      createdAt
      updatedAt
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
