import { gql } from '@/graphql/__generated__';

export const GET_GENRES = gql(`
  query GetGenres($filters: GenreListInputV2) {
      genresV2(filters: $filters) {
        items {
          id
          name
        }
      }
  }
`);
