import { gql } from '../__generated__';

export const GET_MUSIC_CLOCK_ASSIGNMENTS = gql(`
  query GetMusicClockAssignments($networkId: ID!, $filters: MusicAssignmentFilters) {
    musicClockAssignments(networkId: $networkId, filters: $filters) {
      id
      clock {
        id
        name
        targetRuntime
      }
      dayOfWeek
      hour
      startDate
      endDate
      priority
      isTemplate
      network {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);

export const GET_MUSIC_PLAYLISTS = gql(`
  query GetMusicPlaylists($networkId: ID!, $filters: MusicPlaylistFilters!) {
    musicPlaylists(networkId: $networkId, filters: $filters) {
      id
      shortId
      scheduledDate
      scheduledHour
      status
      totalDuration
      estimatedDuration
      isLocked
      notes
      clock {
        id
        name
      }
      items {
        id
        orderIndex
        itemType
        track {
          id
          title
          artist
          duration {
            formatted
          }
        }
        scheduledStart
        scheduledEnd
        actualDuration
        isManualEdit
        notes
      }
      ruleViolations {
        id
        rule {
          id
          name
          ruleType
        }
        severity
        description
        suggestedFix
        autoFixAvailable
      }
      network {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);