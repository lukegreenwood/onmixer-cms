'use client';

import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Tabs, Textarea } from '@soundwaves/components';
import React, { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TracksTable } from '@/blocks/TracksTable/TracksTable';
import type {
  MusicBrainzSearchResult,
  Track,
} from '@/graphql/__generated__/graphql';
import { CREATE_ENRICHMENT_JOB } from '@/graphql/mutations/enrichmentJobs';
import {
  SEARCH_MUSICBRAINZ,
  BULK_SEARCH_MUSICBRAINZ,
  SEARCH_TRACKS,
} from '@/graphql/queries/tracks';

const musicbrainzSearchSchema = z.object({
  artist: z.string().min(1, 'Artist is required'),
  title: z.string().min(1, 'Title is required'),
  album: z.string().optional(),
});

const bulkEnrichSchema = z.object({
  queries: z.string().min(1, 'At least one search query is required'),
});

type MusicBrainzSearchForm = z.infer<typeof musicbrainzSearchSchema>;
type BulkEnrichForm = z.infer<typeof bulkEnrichSchema>;

interface EnrichTracksFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

export function EnrichTracksForm({
  onSuccess,
  onError,
}: EnrichTracksFormProps) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchResults, setSearchResults] = useState<MusicBrainzSearchResult[]>(
    [],
  );
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('');

  const searchForm = useForm<MusicBrainzSearchForm>({
    resolver: zodResolver(musicbrainzSearchSchema),
  });

  const bulkForm = useForm<BulkEnrichForm>({
    resolver: zodResolver(bulkEnrichSchema),
  });

  const [searchMusicBrainz, { loading: searchLoading }] =
    useMutation(SEARCH_MUSICBRAINZ);
  const [bulkSearchMusicBrainz, { loading: bulkSearchLoading }] = useMutation(
    BULK_SEARCH_MUSICBRAINZ,
  );
  const [createEnrichmentJob] = useMutation(CREATE_ENRICHMENT_JOB);

  const { data: tracksData, loading: tracksLoading } = useQuery(SEARCH_TRACKS, {
    variables: {
      filters: {},
    },
  });

  const tracks = useMemo(() => {
    if (!tracksData?.tracks?.items) return [];
    return tracksData.tracks.items as Track[];
  }, [tracksData]);

  const selectedTrack = useMemo(() => {
    if (!selectedTrackId) return null;
    return tracks.find(track => track.id === selectedTrackId);
  }, [selectedTrackId, tracks]);

  const handleMusicBrainzSearch = async (data: MusicBrainzSearchForm) => {
    try {
      const result = await searchMusicBrainz({
        variables: {
          input: {
            artist: data.artist,
            title: data.title,
            limit: 10,
            preferSingles: true,
          },
        },
      });

      if (result.data?.searchMusicBrainz) {
        setSearchResults(result.data.searchMusicBrainz);
      }
    } catch (error) {
      onError?.('Failed to search MusicBrainz');
      console.error('MusicBrainz search error:', error);
    }
  };

  const handleBulkEnrich = async (data: BulkEnrichForm) => {
    const searches = data.queries
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .map((q) => {
        const [artist, title, album] = q.split(' - ').map((s) => s.trim());
        return { artist: artist || '', title: title || q, album };
      });

    try {
      const result = await bulkSearchMusicBrainz({
        variables: {
          input: { searches },
        },
      });

      if (result.data?.bulkSearchMusicBrainz) {
        const { results, totalSearches, successfulSearches, failedSearches } =
          result.data.bulkSearchMusicBrainz;

        // Create enrichment jobs for successful matches
        const enrichmentPromises = results
          .filter((r) => !r.error && r.results.length > 0)
          .map((r) => {
            const bestMatch = r.results[0]; // Use the first (best) match
            return createEnrichmentJob({
              variables: {
                input: {
                  songId: parseInt(selectedTracks[0]), // TODO: Match with correct track
                  musicbrainzReleaseId: bestMatch.id,
                },
              },
            });
          });

        await Promise.all(enrichmentPromises);

        onSuccess?.(
          `Processed ${totalSearches} searches. ` +
            `${successfulSearches} successful, ` +
            `${failedSearches} failed.`,
        );
      }
    } catch (error) {
      onError?.('Failed to perform bulk MusicBrainz search');
      console.error('Bulk MusicBrainz search error:', error);
    }
  };

  const handleAssociateWithTrack = async (mbid: string) => {
    if (!selectedTrackId) {
      onError?.('Please select a track first');
      return;
    }

    try {
      await createEnrichmentJob({
        variables: {
          input: {
            songId: parseInt(selectedTrackId),
            musicbrainzReleaseId: mbid,
          },
        },
      });

      onSuccess?.('Enrichment job created successfully');
      setSelectedTrackId('');
    } catch (error) {
      onError?.('Failed to create enrichment job');
      console.error('Enrichment job error:', error);
    }
  };

  const handleBulkEnrichSelected = useCallback(async () => {
    if (selectedTracks.length === 0) {
      onError?.('Please select at least one track');
      return;
    }

    const selectedTracksList = tracks
      .filter((t) => selectedTracks.includes(t.id))
      .map((t) => `${t.artist} - ${t.title}${t.album ? ` - ${t.album}` : ''}`);

    bulkForm.setValue('queries', selectedTracksList.join('\n'));
    setActiveTab('bulk');
  }, [selectedTracks, tracks, bulkForm, setActiveTab]);

  const renderMusicBrainzResults = () => {
    if (searchResults.length === 0) return null;

    return (
      <div className="enrich-tracks-form__musicbrainz-results">
        <h3>MusicBrainz Search Results</h3>
        <div className="enrich-tracks-form__results-list">
          {searchResults.map((result) => (
            <div key={result.id} className="enrich-tracks-form__result-item">
              <div className="enrich-tracks-form__result-content">
                <div className="enrich-tracks-form__result-title">
                  {result.title}
                </div>
                <div className="enrich-tracks-form__result-artist">
                  {result.artist}
                </div>
                {result.score && (
                  <div className="enrich-tracks-form__result-score">
                    Score: {result.score}%
                  </div>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => handleAssociateWithTrack(result.id)}
                disabled={!selectedTrackId}
              >
                Associate with Track
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="enrich-tracks-form__container">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        variant="contained-top"
      >
        <Tabs.List>
          <Tabs.Trigger value="search">MusicBrainz Search</Tabs.Trigger>
          <Tabs.Trigger value="tracks">Track Management</Tabs.Trigger>
          <Tabs.Trigger value="bulk">Bulk Enrichment</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="search">
          <div className="enrich-tracks-form__musicbrainz-search">
            {selectedTrackId ? (
              <div className="enrich-tracks-form__selected-track">
                <p>
                  <strong>Selected Track:</strong> {selectedTrack ? `${selectedTrack.artist} - ${selectedTrack.title}` : selectedTrackId}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedTrackId('')}
                >
                  Clear Selection
                </Button>
              </div>
            ) : (
              <div className="enrich-tracks-form__no-track-selected">
                <p>
                  <strong>No track selected.</strong> Go to Track Management tab
                  and click &ldquo;Edit&rdquo; on a track to select it for enrichment.
                </p>
              </div>
            )}

            <form
              onSubmit={searchForm.handleSubmit(handleMusicBrainzSearch)}
              className="enrich-tracks-form__search-form"
            >
              <div className="enrich-tracks-form__form-fields">
                <Input
                  label="Artist"
                  placeholder="Enter artist name..."
                  {...searchForm.register('artist')}
                  helperText={searchForm.formState.errors.artist?.message}
                />

                <Input
                  label="Title"
                  placeholder="Enter song title..."
                  {...searchForm.register('title')}
                  helperText={searchForm.formState.errors.title?.message}
                />

                <Input
                  label="Album"
                  placeholder="Enter album name (optional)..."
                  {...searchForm.register('album')}
                  helperText={searchForm.formState.errors.album?.message}
                />
              </div>

              <Button type="submit" disabled={searchLoading}>
                Search MusicBrainz
              </Button>
            </form>

            {renderMusicBrainzResults()}
          </div>
        </Tabs.Content>

        <Tabs.Content value="tracks">
          <div className="enrich-tracks-form__tracks-management">
            <h3>Track Management</h3>
            <TracksTable
              tracks={tracks}
              loading={tracksLoading}
              showBulkActions
              selectedTracks={selectedTracks}
              onSelectTracks={setSelectedTracks}
              onEdit={(trackId) => setSelectedTrackId(trackId)}
            />

            {selectedTracks.length > 0 && (
              <div className="enrich-tracks-form__bulk-actions">
                <Button onClick={handleBulkEnrichSelected}>
                  Enrich Selected ({selectedTracks.length})
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedTracks([])}
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="bulk">
          <form
            onSubmit={bulkForm.handleSubmit(handleBulkEnrich)}
            className="enrich-tracks-form__bulk-form"
          >
            <div className="enrich-tracks-form__bulk-form-fields">
              <p className="enrich-tracks-form__form-help">
                Enter one track per line in the format: Artist - Title - Album
                (Album is optional)
              </p>
              <Textarea
                label="Tracks to Enrich"
                placeholder="Artist - Title - Album"
                {...bulkForm.register('queries')}
                helperText={bulkForm.formState.errors.queries?.message}
              />
            </div>

            <Button type="submit" disabled={bulkSearchLoading}>
              Start Bulk Enrichment
            </Button>
          </form>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
