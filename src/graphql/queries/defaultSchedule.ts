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
