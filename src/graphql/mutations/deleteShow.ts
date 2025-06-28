import { gql } from '../__generated__';

export const DELETE_SHOW = gql(`
  mutation DeleteShow($input: DeleteShowInput!) {
    deleteShow(input: $input) {
      success
      message
    }
  }
`);
