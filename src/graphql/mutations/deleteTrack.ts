import { gql } from '@/graphql/__generated__';

export const DELETE_TRACK = gql(`
  mutation DeleteTrack($input: DeleteTrackInput!) {
    deleteTrack(input: $input) {
      success
      message
    }
  }
`);