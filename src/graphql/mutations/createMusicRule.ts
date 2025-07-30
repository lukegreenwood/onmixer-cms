import { gql } from '../__generated__';

export const CREATE_MUSIC_RULE = gql(`
  mutation CreateMusicRule($input: CreateMusicRuleInput!) {
    createMusicRule(input: $input) {
      success
      message
      rule {
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
      }
    }
  }
`);
