import { gql } from '../__generated__';

export const DELETE_EPISODE = gql(`
  mutation DeleteEpisode($input: DeleteEpisodeInput!) {
    deleteEpisode(input: $input) {
      success
      message
    }
  }
`);
