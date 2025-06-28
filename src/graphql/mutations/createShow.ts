import { gql } from '../__generated__';

export const CREATE_SHOW = gql(`
  mutation CreateShow($input: CreateShowInput!) {
    createShow(input: $input) {
      show {
        id
        fullName
        shortName
        fullDesc
        shortDesc
        hidden
        extraData
        featuredImage {
          id
          key
          urls {
            medium
            square
          }
        }
        networks {
          id
          name
          logoSvgIcon
        }
        presenters {
          id
          name
        }
        series {
          items {
            id
            fullName
          }
        }
        totalEpisodes
        createdAt
        updatedAt
        url
      }
    }
  }
`);
