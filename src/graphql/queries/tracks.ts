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
        name
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
  mutation SearchMusicBrainz($artist: String!, $title: String!) {
    searchMusicBrainz(artist: $artist, title: $title) {
      id
      title
      artist
      score
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
