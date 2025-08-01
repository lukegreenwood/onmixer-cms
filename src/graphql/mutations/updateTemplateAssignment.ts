import { gql } from '../__generated__';

export const UPDATE_TEMPLATE_ASSIGNMENT = gql(`
  mutation UpdateTemplateAssignment($input: UpdateMusicAssignmentInput!) {
    updateMusicAssignment(input: $input) {
      success
      message
      assignment {
        id
        isTemplate
        clockId
        dayOfWeek
        hour
        clock {
          id
          name
          color
          targetRuntime
        }
      }
    }
  }
`);