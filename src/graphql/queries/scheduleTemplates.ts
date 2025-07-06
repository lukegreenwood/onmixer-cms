import { gql } from '../__generated__';

export const GET_SCHEDULE_TEMPLATES = gql(`
  query GetScheduleTemplates($filters: DefaultScheduleListInput!) {
    defaultSchedules(filters: $filters) {
      total
      items {
        id
        name
        assignedTo
        networks {
          id
          name
          code
          logoSvgIcon
        }
      }
    }
  }
`);

export const GET_SCHEDULE_TEMPLATE = gql(`
  query GetScheduleTemplate($id: ID!) {
    defaultSchedule(id: $id) {
      id
      name
      assignedTo
      networks {
        id
        name
        code
      }
      items {
        id
        start
        end
        endsNextDay
        episodeName
        episodeDesc
        show {
          id
          fullName
          shortName
        }
        series {
          id
          fullName
          shortName
        }
        presenters {
          id
          name
        }
        media {
          id
          key
          urls {
            medium
            original
          }
        }
        networks {
          id
          name
          code
          logoSvgIcon
        }
        existingEpisode {
          id
          name
          description
        }
        repeatOf {
          id
          episodeName
        }
      }
    }
  }
`);