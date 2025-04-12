import { gql } from '../__generated__';

export const SEARCH_EPISODES = gql(`
  query SearchEpisodes($filters: EpisodeListInput) {
    episodes(filters: $filters) {
      items {
        id
        name
        show {
          id
          shortName
        }
      }
    }
  }
`);

export const GET_EPISODE_DETAILS = gql(`
  query GetEpisodeDetails($id: ID!) {
    episode(id: $id) {
    	id
      name
      show {
        id
        shortName
      }
      description
      broadcasts {
        id
      }
      featuredImage {
        urls {
          square
          customSquare(size: 150)
        }
      }
      networks {
        id
        logoSvgIcon
      }
    }
  }
`);
