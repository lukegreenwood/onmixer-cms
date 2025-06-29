import { gql } from '../__generated__';

export const UPDATE_EPISODE = gql(`
  mutation UpdateEpisode($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
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
            type
            mimeType
        fileSize {
            label
            raw
        }
        urls {
            medium
            square
        }
        }
        show {
            id
            shortName
        }
        series {
            id
            shortName
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
