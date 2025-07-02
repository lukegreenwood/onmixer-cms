import { gql } from '../__generated__';

export const DELETE_PRESENTER = gql(`
  mutation DeletePresenter($input: DeletePresenterInput!) {
    deletePresenter(input: $input) {
      success
      message
    }
  }
`);
