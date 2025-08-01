import { gql } from '../__generated__';

export const GET_MUSIC_CLOCK_TEMPLATES = gql(`
  query GetMusicClockTemplates($networkId: ID!) {
    musicClockTemplates(networkId: $networkId) {
      id
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
          targetRuntime
        }
      }
    }
  }
`);

export const GET_MUSIC_CLOCK_TEMPLATE = gql(`
  query GetMusicClockTemplate($id: ID!) {}
  #   musicClockTemplate(id: $id) {
  #     id
  #     name
  #     description
  #     isDefault
  #     createdAt
  #     updatedAt
  #     assignments {
  #       id
  #       dayOfWeek
  #       hour
  #       clock {
  #         id
  #         name
  #         targetRuntime
  #         items {
  #           ...TrackClockItemFragment
  #           ...SubcategoryClockItemFragment
  #           ...GenreClockItemFragment
  #           ...NoteClockItemFragment
  #         }
  #       }
  #     }
  #   }
  # }
  
  # fragment TrackClockItemFragment on TrackClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   trackId
  #   track {
  #     id
  #     title
  #     artist
  #     duration {
  #       formatted
  #     }
  #     album
  #   }
  # }
  
  # fragment SubcategoryClockItemFragment on SubcategoryClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   subcategoryId
  #   subcategory {
  #     id
  #     name
  #   }
  #   averageDuration
  # }
  
  # fragment GenreClockItemFragment on GenreClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   genreId
  #   genre {
  #     id
  #     name
  #   }
  #   averageDuration
  # }
  
  # fragment NoteClockItemFragment on NoteClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   content
  #   color
  # }
`);

export const GET_AVAILABLE_CLOCKS = gql(`
  query GetAvailableClocks($networkId: ID!) {
    # musicClocks(networkId: $networkId, filters: { isTemplate: true }) {
    #   id
    #   name
    #   description
    #   targetRuntime
    #   items {
    #     ...TrackClockItemFragment
    #     ...SubcategoryClockItemFragment
    #     ...GenreClockItemFragment
    #     ...NoteClockItemFragment
    #   }
    # }
  }
  
  # fragment TrackClockItemFragment on TrackClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   trackId
  #   track {
  #     id
  #     title
  #     artist
  #     duration {
  #       formatted
  #     }
  #     album
  #   }
  # }
  
  # fragment SubcategoryClockItemFragment on SubcategoryClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   subcategoryId
  #   subcategory {
  #     id
  #     name
  #   }
  #   averageDuration
  # }
  
  # fragment GenreClockItemFragment on GenreClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   genreId
  #   genre {
  #     id
  #     name
  #   }
  #   averageDuration
  # }
  
  # fragment NoteClockItemFragment on NoteClockItem {
  #   id
  #   clockId
  #   orderIndex
  #   duration
  #   name
  #   createdAt
  #   updatedAt
  #   content
  #   color
  # }
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
          targetRuntime
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
        targetRuntime
      }
    }
  }
`);
