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

export const GET_SHOW = gql(`
  query GetShow($id: ID!) {
    show(id: $id) {
      createdAt
      extraData
      featuredImage {
        id
        key
        urls {
          medium
          square
        }
      }
      fullDesc
      fullName
      hidden
      id
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
      shortDesc
      shortId
      shortName
      updatedAt
      url
    }
  }
`);
