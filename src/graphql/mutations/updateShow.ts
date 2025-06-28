import { gql } from '../__generated__';

export const UPDATE_SHOW = gql(`
  mutation UpdateShow($input: UpdateShowInput!) {
    updateShow(input: $input) {
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
