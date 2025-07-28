import { gql } from '@/graphql/__generated__';

export const GET_MUSIC_CLOCK_TEMPLATES = gql(`
  query GetMusicClockTemplates($networkId: ID!) {
    musicClockTemplates(networkId: $networkId) {
      id
      shortId
      name
      description
      isDefault
      createdAt
      updatedAt
      assignments {
        id
        dayOfWeek
        hour
        clock {
          id
          name
          duration
        }
      }
    }
  }
`);

export const GET_MUSIC_CLOCK_TEMPLATE = gql(`
  query GetMusicClockTemplate($id: ID!) {
    musicClockTemplate(id: $id) {
      id
      name
      description
      isDefault
      assignments {
        id
        dayOfWeek
        hour
        clock {
          id
          name
          duration
          items {
            id
            name
            duration
          }
        }
      }
    }
  }
`);

export const GET_AVAILABLE_CLOCKS = gql(`
  query GetAvailableClocks($networkId: ID!) {
    musicClocks(networkId: $networkId, filters: { isTemplate: true }) {
      id
      name
      description
      duration
      items {
        id
        name
        duration
      }
    }
  }
`);

export const GET_WEEKLY_SCHEDULE = gql(`
  query GetWeeklySchedule($networkId: ID!, $weekCommencing: String!) {
    musicClockTemplates(networkId: $networkId) {
      id
      name
      isDefault
      assignments {
        dayOfWeek
        hour
        clock {
          id
          name
          duration
        }
      }
    }
    
    musicClockWeeklyOverrides(
      networkId: $networkId
      weekCommencing: $weekCommencing
    ) {
      id
      dayOfWeek
      hour
      reason
      clock {
        id
        name
        duration
      }
    }
  }
`);