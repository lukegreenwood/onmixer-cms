import { gql } from '@/graphql/__generated__';

export const CREATE_GENRE = gql(`
  mutation CreateGenre($input: CreateGenreInput!) {
    createGenre(input: $input) {
      success
      message
      genre {
        id
        name
      }
    }
  }
`);