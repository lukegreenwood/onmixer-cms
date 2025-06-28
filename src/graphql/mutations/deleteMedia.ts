import { gql } from '../__generated__';

export const DELETE_MEDIA = gql(`
  mutation DeleteMedia($input: DeleteMediaInput!) {
    deleteMedia(input: $input) {
      success
      message
    }
  }
`);
