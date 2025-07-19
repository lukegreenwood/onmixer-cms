import { gql } from '@/graphql/__generated__';

export const UPDATE_TRACK = gql(`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
      success
      message
      track {
        id
        title
        artist
        album
        year
        genre {
          id
          name
        }
        isrc
        label
        copyright
        composer
        publisher
        image
        metadata {
          id
          key
          value
        }
        enabled
        dateAdded
        dateModified
      }
    }
  }
`);