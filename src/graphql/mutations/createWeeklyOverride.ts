import { gql } from '../__generated__';

export const DELETE_WEEKLY_OVERRIDE = gql(`
  mutation DeleteWeeklyOverride($id: ID!) {
    removeWeeklyOverride(id: $id) {
      success
      message
    }
  }
`);

// Re-export the existing CREATE_WEEKLY_OVERRIDE from musicClockTemplates
export { CREATE_WEEKLY_OVERRIDE } from './musicClockTemplates';