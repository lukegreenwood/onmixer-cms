import { gql } from '../__generated__';

export const SEARCH_SHOWS = gql(`
  query SearchShows($filters: ShowListInput) {
    shows(filters: $filters) {
      items {
        id
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
