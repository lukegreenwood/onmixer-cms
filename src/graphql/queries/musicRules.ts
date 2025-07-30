import { gql } from '../__generated__';

export const GET_MUSIC_RULES = gql(`
  query GetMusicRules($networkId: ID, $filters: MusicRuleFilters) {
    musicRules(networkId: $networkId, filters: $filters) {
      id
      name
      description
      ruleType
      breakable
      value
      unit
      criteria {
        categories
        genres
        artists
        tags
        timeWindows {
          startHour
          endHour
          daysOfWeek
        }
      }
      priority
      isActive
      network {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);

export const GET_MUSIC_RULE = gql(`
  query GetMusicRule($id: ID!) {
    musicRule(id: $id) {
      id
      name
      description
      ruleType
      breakable
      value
      unit
      criteria {
        categories
        genres
        artists
        tags
        timeWindows {
          startHour
          endHour
          daysOfWeek
        }
      }
      priority
      isActive
      network {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);
