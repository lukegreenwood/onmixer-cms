import { gql } from '../__generated__';
import {
  TRACK_CLOCK_ITEM_FRAGMENT,
  SUBCATEGORY_CLOCK_ITEM_FRAGMENT,
  GENRE_CLOCK_ITEM_FRAGMENT,
  NOTE_CLOCK_ITEM_FRAGMENT,
} from '../fragments/clockItemFragments';

export const DUPLICATE_MUSIC_CLOCK = gql(`
  mutation DuplicateMusicClock($id: ID!, $name: String!) {
    duplicateMusicClock(id: $id, name: $name) {
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
  ${TRACK_CLOCK_ITEM_FRAGMENT}
  ${SUBCATEGORY_CLOCK_ITEM_FRAGMENT}
  ${GENRE_CLOCK_ITEM_FRAGMENT}
  ${NOTE_CLOCK_ITEM_FRAGMENT}
`);