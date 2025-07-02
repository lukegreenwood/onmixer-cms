import { gql } from '../__generated__';

export const CREATE_PRESENTER = gql(`
  mutation CreatePresenter($input: CreatePresenterInput!) {
    createPresenter(input: $input) {
      presenter {
        id
        name
        bio
        shortBio
        hidden
        hero
        picture
        networks {
          id
          name
          logoSvgIcon
        }
      }
    }
  }
`);
