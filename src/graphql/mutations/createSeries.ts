import { gql } from '../__generated__';

export const CREATE_SERIES = gql(`
  mutation CreateSeries($input: CreateSeriesInput!) {
    createSeries(input: $input) {
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
