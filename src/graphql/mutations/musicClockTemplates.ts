import { gql } from '../__generated__';

export const CREATE_MUSIC_CLOCK_TEMPLATE = gql(`
  mutation CreateMusicClockTemplate($input: CreateMusicClockTemplateInput!) {
    # createMusicClockTemplate(input: $input) {
    #   success
    #   message
    #   template {
    #     id
    #     name
    #     description
    #     isDefault
    #     createdAt
    #     updatedAt
    #   }
    # }
  }
`);

export const UPDATE_MUSIC_CLOCK_TEMPLATE = gql(`
  mutation UpdateMusicClockTemplate($input: UpdateMusicClockTemplateInput!) {
    updateMusicClockTemplate(input: $input) {
      success
      message
      template {
        id
        name
        description
        isDefault
        createdAt
        updatedAt
      }
    }
  }
`);

export const DELETE_MUSIC_CLOCK_TEMPLATE = gql(`
  mutation DeleteMusicClockTemplate($id: ID!) {
    deleteMusicClockTemplate(id: $id) {
      success
      message
    }
  }
`);

export const SET_DEFAULT_MUSIC_CLOCK_TEMPLATE = gql(`
  mutation SetDefaultMusicClockTemplate($networkId: ID!, $templateId: ID!) {
    setDefaultMusicClockTemplate(networkId: $networkId, templateId: $templateId) {
      success
      message
    }
  }
`);

export const ASSIGN_CLOCK_TO_TEMPLATE = gql(`
  mutation AssignClockToTemplate($input: AssignClockToTemplateInput!) {
    assignClockToTemplate(input: $input) {
      success
      message
      assignment {
        id
        dayOfWeek
        hour
        clock {
          id
          name
        }
      }
    }
  }
`);

export const REMOVE_CLOCK_FROM_TEMPLATE = gql(`
  mutation RemoveClockFromTemplate($id: ID!) {
    removeClockFromTemplate(id: $id) {
      success
      message
    }
  }
`);

export const CREATE_WEEKLY_OVERRIDE = gql(`
  mutation CreateWeeklyOverride($input: CreateWeeklyOverrideInput!) {
    createWeeklyOverride(input: $input) {
      success
      message
      override {
        id
        weekCommencing
        dayOfWeek
        hour
        reason
        clock {
          id
          name
        }
      }
    }
  }
`);

export const REMOVE_WEEKLY_OVERRIDE = gql(`
  mutation RemoveWeeklyOverride($id: ID!) {
    removeWeeklyOverride(id: $id) {
      success
      message
    }
  }
`);
