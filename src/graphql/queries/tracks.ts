import { gql } from '@/graphql/__generated__';

export const SEARCH_TRACKS = gql(`
  query SearchTracks($filters: TrackListInput) {
    tracks(filters: $filters) {
      items {
        id
        artist
        title
        album
        duration {
          formatted
          raw
        }
        path
        enabled
        year
        genre {
          name
        }
        isrc
        bpm
        dateAdded
        dateModified
      }
      total
    }
  }
`);

export const SEARCH_TRACKS_V2 = gql(`
  query SearchTracksV2($filters: TrackListInputV2) {
    tracksV2(filters: $filters) {
      items {
        id
        artist
        title
        album
        duration {
          formatted
          raw
        }
        path
        enabled
        year
        genre {
          id
          name
        }
        subcategory {
          id
          name
          category {
            id
            name
          }
        }
        metadata {
          id
        }
        isrc
        bpm
        dateAdded
        dateModified
      }
      total
    }
  }
`);

export const GET_TRACK = gql(`
  query GetTrack($id: ID!) {
    track(id: $id) {
      id
      artist
      title
      album
      duration {
        formatted
        raw
      }
      path
      enabled
      year
      genre {
        id
        name
      }
      subcategory {
        id
        name
        category {
          id
          name
        }
      }
      isrc
      bpm
      dateAdded
      dateModified
      label
      copyright
      composer
      publisher
      image
      metadata {
        id
        key
        value
      }
    }
  }
`);

export const SEARCH_YOUTUBE = gql(`
  mutation SearchYouTube($query: String!) {
    searchYouTube(query: $query) {
      url
      title
      artist
      duration
      thumbnail
      description
    }
  }
`);

export const BULK_SEARCH_YOUTUBE = gql(`
  mutation BulkSearchYouTube($input: BulkSearchYouTubeInput!) {
    bulkSearchYouTube(input: $input) {
      success
      message
      results {
        query
        results {
          url
          title
          artist
          duration
          thumbnail
          description
        }
        error
      }
      totalQueries
      successfulQueries
      failedQueries
    }
  }
`);

export const SEARCH_MUSICBRAINZ = gql(`
  query SearchMusicBrainz($input: MusicBrainzSearchInput!) {
    searchMusicBrainz(input: $input) {
      # Core recording identification
      id
      recordingId

      # Core metadata (with Picard scoring weights)
      title
      artist
      artistId
      artistSortOrder

      # Full artist credits array
      artists {
        id
        name
        sortName
        joinPhrase
      }

      # Track metadata
      length

      # Industry identifiers
      isrc

      # Enhanced scoring
      score

      # Nested releases for this recording
      releases {
        # Core release identification
        id
        releaseId
        releaseGroupId

        # Core metadata
        album

        # Track information within this release
        trackNumber
        totalTracks
        discNumber
        totalDiscs

        # Release information
        date
        originalDate
        year
        country

        # Release categorization
        releaseType
        releaseStatus

        # Industry identifiers
        barcode

        # Additional metadata
        albumArtistSortOrder
        media
        label # Resolved via field resolver using DataLoader

        # MusicBrainz IDs for linking
        releaseArtistId
        trackId

        # Enhanced scoring for this specific release
        score
      }

      # Dynamic metadata fields
      dynamicFields {
        key
        value
      }
    }
  }
`);

export const BULK_SEARCH_MUSICBRAINZ = gql(`
  mutation BulkSearchMusicBrainz($input: BulkSearchMusicBrainzInput!) {
    bulkSearchMusicBrainz(input: $input) {
      success
      message
      results {
        id
        query {
          artist
          title
          album
        }
        results {
          id
          title
          artist
          score
        }
        error
      }
      totalSearches
      successfulSearches
      failedSearches
    }
  }
`);
