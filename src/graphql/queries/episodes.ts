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

export const SEARCH_EPISODES_V2 = gql(`
  query SearchEpisodesV2($filters: EpisodeListInputV2) {
    episodesV2(filters: $filters) {
      total
      items {
        id
        shortId
        name
        description
        createdAt
        updatedAt
        duration {
          formatted
          raw
        }
        featuredImage {
          urls {
            square
          }
        }
        show {
          id
          shortName
          shortId
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
        series {
          id
          shortName
        }
        broadcasts {
          id
          start
          end
        }
      }
    }
  }
`);

export const GET_EPISODE = gql(`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      description
      duration {
        formatted
        raw
      }
      extraData
      shortId
      createdAt
      updatedAt
      url
      featuredImage {
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
        }
      }
      show {
        id
        shortName
      }
      series {
        id
        shortName
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
