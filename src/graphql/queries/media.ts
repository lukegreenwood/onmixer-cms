import { gql } from '@/graphql/__generated__';

export const GET_MEDIA = gql(`
  query GetMedia($id: ID!) {
    media(id: $id) {
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
        original
      }
      createdAt
      updatedAt
    }
  }
`);

export const SEARCH_MEDIA = gql(`
  query SearchMedia($filters: MediaListInput) {
    mediaList(filters: $filters) {
      total
      items {
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
          original
        }
        createdAt
      }
    }
  }
`);
