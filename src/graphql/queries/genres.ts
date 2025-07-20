import { gql } from '@/graphql/__generated__';

export const GET_GENRES = gql(`
  query GetGenres {
    genres {
      id
      name
    }
  }
`);