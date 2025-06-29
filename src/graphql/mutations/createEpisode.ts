import { gql } from '../__generated__';

export const CREATE_EPISODE = gql(`
  mutation CreateEpisode($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      episode {
        id
        name
        description
        duration {
          formatted
          raw
        }
        extraData
        shortId
        createdAt
        updatedAt
        url
        featuredImage {
          id
          key
          urls {
            medium
            square
          }
        }
        show {
          id
          shortName
          fullName
        }
        series {
          id
          fullName
        }
        presenters {
          id
          name
        }
        networks {
          id
          name
          logoSvgIcon
        }
      }
    }
  }
`);
