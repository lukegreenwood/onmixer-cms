import { gql } from '@/graphql/__generated__';

export const UPDATE_TRACK_METADATA = gql(`
  mutation UpdateTrackMetadata($input: UpdateTrackMetadataInput!) {
    updateTrackMetadata(input: $input) {
      success
      message
      track {
        id
        metadata {
          id
          key
          value
        }
      }
    }
  }
`);