import { gql } from '../__generated__';

export const UPDATE_SERIES = gql(`
  mutation UpdateSeries($input: UpdateSeriesInput!) {
    updateSeries(input: $input) {
      series {
        id
        fullName
        shortName
        fullDesc
        shortDesc
        archived
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
          fullName
        }
        network {
          id
          name
        }
      }
    }
  }
`);
