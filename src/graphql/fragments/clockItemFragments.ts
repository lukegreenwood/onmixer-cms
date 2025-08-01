import { gql } from '../__generated__';

export const TRACK_CLOCK_ITEM_FRAGMENT = gql(`
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
`);

export const SUBCATEGORY_CLOCK_ITEM_FRAGMENT = gql(`
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
`);

export const GENRE_CLOCK_ITEM_FRAGMENT = gql(`
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
`);

export const NOTE_CLOCK_ITEM_FRAGMENT = gql(`
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