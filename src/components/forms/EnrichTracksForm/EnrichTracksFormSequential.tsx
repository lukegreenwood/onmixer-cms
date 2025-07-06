'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Button, Tabs } from '@soundwaves/components';
import React, { useState, useCallback, useMemo } from 'react';

import { MusicBrainzSearchModal } from '@/blocks/MusicBrainzSearchModal';
import { TracksTable } from '@/blocks/TracksTable/TracksTable';
import type {
  MusicBrainzSearchResult,
  Track,
} from '@/graphql/__generated__/graphql';
import { CREATE_ENRICHMENT_JOB } from '@/graphql/mutations/enrichmentJobs';
import { SEARCH_TRACKS } from '@/graphql/queries/tracks';

interface EnrichTracksFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

export function EnrichTracksForm({
  onSuccess,
  onError,
}: EnrichTracksFormProps) {
  const [activeTab, setActiveTab] = useState('single');
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  const [currentTrackForEnrichment, setCurrentTrackForEnrichment] = useState<Track | null>(null);
  const [musicBrainzModal, setMusicBrainzModal] = useState(false);

  // GraphQL
  const { data: tracksData, loading: tracksLoading } = useQuery(SEARCH_TRACKS, {
    variables: { filters: {} },
  });

  const [createEnrichmentJob] = useMutation(CREATE_ENRICHMENT_JOB);

  const tracks = useMemo(() => {
    return (tracksData?.tracks?.items as Track[]) || [];
  }, [tracksData?.tracks?.items]);

  // Single track enrichment flow
  const handleSingleEnrich = useCallback((track: Track) => {
    setCurrentTrackForEnrichment(track);
    setMusicBrainzModal(true);
  }, []);

  // Bulk track enrichment flow
  const handleBulkEnrich = useCallback(() => {
    if (selectedTrackIds.length === 0) {
      onError?.('Please select at least one track');
      return;
    }

    // Start with the first selected track
    const firstTrack = tracks.find(t => t.id === selectedTrackIds[0]);
    if (firstTrack) {
      setCurrentTrackForEnrichment(firstTrack);
      setMusicBrainzModal(true);
    }
  }, [selectedTrackIds, tracks, onError]);

  // Handle MusicBrainz selection
  const handleMusicBrainzSelect = useCallback(async (result: MusicBrainzSearchResult) => {
    if (!currentTrackForEnrichment) return;

    try {
      await createEnrichmentJob({
        variables: {
          input: {
            songId: parseInt(currentTrackForEnrichment.id),
            musicbrainzReleaseId: result.id,
          },
        },
      });

      onSuccess?.(`Created enrichment job for "${currentTrackForEnrichment.artist} - ${currentTrackForEnrichment.title}"`);
      
      // For bulk enrichment, move to next track
      if (activeTab === 'bulk' && selectedTrackIds.length > 1) {
        const currentIndex = selectedTrackIds.indexOf(currentTrackForEnrichment.id);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < selectedTrackIds.length) {
          const nextTrack = tracks.find(t => t.id === selectedTrackIds[nextIndex]);
          if (nextTrack) {
            setCurrentTrackForEnrichment(nextTrack);
            // Keep modal open for next track
            return;
          }
        }
      }

      // Close modal and reset
      setMusicBrainzModal(false);
      setCurrentTrackForEnrichment(null);
      
      // Clear selection if bulk
      if (activeTab === 'bulk') {
        setSelectedTrackIds([]);
      }
    } catch (error) {
      onError?.('Failed to create enrichment job');
      console.error('Enrichment job error:', error);
    }
  }, [currentTrackForEnrichment, createEnrichmentJob, onSuccess, onError, activeTab, selectedTrackIds, tracks]);

  // Close modal handler
  const handleCloseMusicBrainz = useCallback(() => {
    setMusicBrainzModal(false);
    setCurrentTrackForEnrichment(null);
  }, []);

  return (
    <div className="enrich-tracks-form__container">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        variant="contained-top"
      >
        <Tabs.List>
          <Tabs.Trigger value="single">Single Track Enrichment</Tabs.Trigger>
          <Tabs.Trigger value="bulk">Bulk Track Enrichment</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="single">
          <div className="enrich-tracks-form__single">
            <h3>Select a track to enrich</h3>
            <p className="enrich-tracks-form__instructions">
              Click the &ldquo;Enrich&rdquo; button on any track to search for its metadata in MusicBrainz.
            </p>
            <TracksTable
              tracks={tracks}
              loading={tracksLoading}
              showBulkActions={false}
              onEnrich={handleSingleEnrich}
            />
          </div>
        </Tabs.Content>

        <Tabs.Content value="bulk">
          <div className="enrich-tracks-form__bulk">
            <h3>Bulk Track Enrichment</h3>
            <p className="enrich-tracks-form__instructions">
              Select multiple tracks and enrich them one by one. You&rsquo;ll be prompted to search MusicBrainz for each track.
            </p>
            
            <TracksTable
              tracks={tracks}
              loading={tracksLoading}
              showBulkActions={true}
              selectedTracks={selectedTrackIds}
              onSelectTracks={setSelectedTrackIds}
            />

            {selectedTrackIds.length > 0 && (
              <div className="enrich-tracks-form__bulk-actions">
                <Button onClick={handleBulkEnrich}>
                  Enrich Selected Tracks ({selectedTrackIds.length})
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedTrackIds([])}
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </div>
        </Tabs.Content>
      </Tabs>

      <MusicBrainzSearchModal
        isOpen={musicBrainzModal}
        onClose={handleCloseMusicBrainz}
        onSelect={handleMusicBrainzSelect}
        initialValues={currentTrackForEnrichment ? {
          artist: currentTrackForEnrichment.artist,
          title: currentTrackForEnrichment.title,
          album: currentTrackForEnrichment.album || undefined,
        } : undefined}
      />
    </div>
  );
}