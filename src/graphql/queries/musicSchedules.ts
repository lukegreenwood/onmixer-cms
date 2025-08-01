import { gql } from '../__generated__';

export const GET_MUSIC_SCHEDULES = gql(`
  query MusicSchedules($networkId: ID!, $startDate: Date!, $endDate: Date!) {
    musicSchedules(networkId: $networkId, startDate: $startDate, endDate: $endDate) {
      id
      networkId
      scheduledDate
      hour
      clockId
      playlistName
      exportedToRadioDj
      ruleViolations {
        ruleId
        ruleName
        ruleType
        severity
        description
        conflictTrackId
        conflictTime
      }
      items {
        id
        orderIndex
        itemType
        trackId
        track {
          id
          title
          artist
          duration {
            formatted
          }
        }
        noteContent
        duration
        startTime
        ruleViolations {
          ruleId
          ruleName
          ruleType
          severity
          description
          conflictTrackId
          conflictTime
        }
      }
      clock {
        id
        name
        color
        targetRuntime
      }
    }
  }
`);

export const GET_WEEKLY_OVERRIDES = gql(`
  query WeeklyOverrides($networkId: ID!, $templateId: ID!, $weekCommencing: String!) {
    musicClockWeeklyOverrides(networkId: $networkId, templateId: $templateId, weekCommencing: $weekCommencing) {
      id
      networkId
      templateId
      clockId
      weekCommencing
      dayOfWeek
      hour
      reason
      clock {
        id
        name
        color
        targetRuntime
      }
    }
  }
`);