import { gql } from '../__generated__';

export const SEARCH_SERIES = gql(`
  query SearchSeries($filters: SeriesListInputV2) {
    seriesListV2(filters: $filters) {
      total
      items {
        id
        shortName
        fullName
        archived
        show {
          id
          shortName
        }
        network {
          id
          name
          logoSvgIcon
        }
      }
    }
  }
`);

export const GET_SERIES = gql(`
  query GetSeries($id: ID!) {
    series(id: $id) {
      id
      shortName
      fullName
      shortDesc
      fullDesc
      archived
      show {
        id
        shortName
        fullName
      }
      network {
        id
        name
      }
      featuredImage {
        id
        key
        urls {
          medium
          square
        }
      }
    }
  }
`);
