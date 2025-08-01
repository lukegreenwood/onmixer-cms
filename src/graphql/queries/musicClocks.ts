import { gql } from '../__generated__';

export const GET_MUSIC_CLOCKS = gql(/* GraphQL */ `
  query GetMusicClocks($networkId: ID!, $filters: MusicClockFilters) {
    musicClocks(networkId: $networkId, filters: $filters) {
      id
      name
      description
      color
      targetRuntime
      network {
        id
        name
        logoSvgIcon
      }
      createdAt
      updatedAt
      items {
        ... on TrackClockItem {
          ...CommonClockItemFields
          track {
            id
            title
          }
        }
        ... on SubcategoryClockItem {
          ...CommonClockItemFields
          subcategory {
            id
            name
            category {
              id
              name
            }
          }
        }
        ... on GenreClockItem {
          ...CommonClockItemFields
          genre {
            id
            name
          }
        }
        ... on NoteClockItem {
          ...CommonClockItemFields
          label
          content
        }
        ... on AdBreakClockItem {
          ...CommonClockItemFields
          scheduledStartTime
        }
        ... on CommandClockItem {
          ...CommonClockItemFields
          command
        }
      }
    }
  }

  fragment CommonClockItemFields on ClockItemInterface {
    id
    clockId
    createdAt
    duration
    orderIndex
    updatedAt
  }
`);

export const GET_MUSIC_CLOCK = gql(`
  query GetMusicClock($id: ID!) {
    musicClock(id: $id) {
      id
      name
      description
      color
      targetRuntime
      network {
        id
        name
      }
      createdAt
      updatedAt
      items {
        ...on TrackClockItem {
          ...CommonClockItemFields,
          track {
            id
            title
          }
        }
        ... on SubcategoryClockItem {
          ...CommonClockItemFields,
          subcategory {
            id
            name
            category {
              id
              name
            }
          }
        }
        ... on GenreClockItem {
          ...CommonClockItemFields,
          genre {
            id
            name
          }
        }
        ... on NoteClockItem {
          ...CommonClockItemFields
          label
          content
        }
        ... on AdBreakClockItem {
          ...CommonClockItemFields
          scheduledStartTime
        }
        ... on CommandClockItem {
          ...CommonClockItemFields
          command
        }
      }
    }
  }

fragment CommonClockItemFields on ClockItemInterface {
	id
	clockId
	createdAt
	duration
	orderIndex
	updatedAt
}
`);
