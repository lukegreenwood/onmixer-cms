import { gql } from '../__generated__';

export const UPDATE_PRESENTER = gql(`
  mutation UpdatePresenter($input: UpdatePresenterInput!) {
    updatePresenter(input: $input) {
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
