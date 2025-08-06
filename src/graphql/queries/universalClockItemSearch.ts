import { gql } from '@/graphql/__generated__';

export const UNIVERSAL_CLOCK_ITEM_SEARCH = gql(/* GraphQL */ `
  query UniversalClockItemSearch(
    $searchTerm: String!
    $networkId: ID!
    $limit: Int = 20
  ) {
    # Search tracks
    tracksV2(filters: {
      limit: $limit
      filterGroup: {
        operator: OR
        filters: [
          {
            type: TEXT
            textFilter: {
              field: title
              operator: CONTAINS
              value: $searchTerm
            }
          }
          {
            type: TEXT
            textFilter: {
              field: artist
              operator: CONTAINS
              value: $searchTerm
            }
          }
        ]
      }
    }) {
      items {
        id
        artist
        title
        album
        duration {
          formatted
          raw
        }
        genre {
          id
          name
        }
        subcategory {
          id
          name
          color
          category {
            id
            name
          }
        }
      }
    }

    # Search genres
    genresV2(filters: {
      limit: $limit
      filterGroup: {
        operator: AND
        filters: [
          {
            type: TEXT
            textFilter: {
              field: name
              operator: CONTAINS
              value: $searchTerm
            }
          }
        ]
      }
    }) {
      items {
        id
        name
      }
    }

    # Search subcategories directly
    subcategories(filters: {
      limit: $limit
      name: $searchTerm
    }) {
      id
      name
      color
      averageDuration {
        raw
        formatted
      }
      category {
        id
        name
      }
    }

    # Search library notes
    libraryNotes: musicClockItemLibrary(
      networkId: $networkId
      type: NOTE
      search: $searchTerm
    ) {
      items {
        ... on MusicClockLibraryNote {
          id
          label
          content
          duration
          createdAt
          updatedAt
        }
      }
    }

    # Search library commands
    libraryCommands: musicClockItemLibrary(
      networkId: $networkId
      type: COMMAND
      search: $searchTerm
    ) {
      items {
        ... on MusicClockLibraryCommand {
          id
          label
          command
          duration
          createdAt
          updatedAt
        }
      }
    }

    # Search library ad breaks
    libraryAdBreaks: musicClockItemLibrary(
      networkId: $networkId
      type: AD_BREAK
      search: $searchTerm
    ) {
      items {
        ... on MusicClockLibraryAdBreak {
          id
          duration
          scheduledStartTime
          createdAt
          updatedAt
        }
      }
    }
  }
`);
