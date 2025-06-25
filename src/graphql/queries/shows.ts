import { gql } from '../__generated__';

export const SEARCH_SHOWS = gql(`
  query SearchShows($filters: ShowListInputV2) {
    showsV2(filters: $filters) {
      total
      items {
        id
        shortId
        shortName
        fullName
        featuredImage {
          urls {
            square
          }
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
        hidden
      }
    }
  }
`);
