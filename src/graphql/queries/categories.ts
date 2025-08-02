import { gql } from '@/graphql/__generated__';

export const GET_CATEGORIES = gql(`
  query GetCategories {
    categories {
      id
      name
      subcategories {
        id
        name
        color
        averageDuration {
          raw
          formatted
        }
      }
    }
  }
`);
