import { gql } from '../__generated__';

export const SEARCH_DEFAULT_SCHEDULE = gql(`
    query SearchDefaultSchedule($filters: DefaultScheduleListInput!) {
        defaultSchedules(
            filters: $filters
        ) {
		total
		items {
			id
			assignedTo
			name
            networks {
                id
                name
            }
        }
    }
}`);

export const GET_DEFAULT_SCHEDULES = gql(`
  query GetDefaultSchedules($filters: DefaultScheduleListInput!) {
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

export const GET_DEFAULT_SCHEDULE = gql(`
  query GetDefaultSchedule($id: ID!) {
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
          featuredImage {
            urls {
              customSquare(size: 120)
            }
          }
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
