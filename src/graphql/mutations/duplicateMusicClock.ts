import { gql } from '../__generated__';

export const DUPLICATE_MUSIC_CLOCK = gql(`
  mutation DuplicateMusicClock($id: ID!, $name: String!) {
    duplicateMusicClock(id: $id, name: $name) {
    #   success
    #   message
    #   clock {
    #     id
    #     name
    #     description
    #     color
    #     targetRuntime
    #     networkId
    #     items {
    #       ...TrackClockItemFragment
    #       ...SubcategoryClockItemFragment
    #       ...GenreClockItemFragment
    #       ...NoteClockItemFragment
    #     }
    #     network {
    #       id
    #       name
    #     }
    #   }
    # }
  }
  }
`);
