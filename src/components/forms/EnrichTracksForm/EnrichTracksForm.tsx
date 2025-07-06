'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Button, Tabs, Autocomplete } from '@soundwaves/components';
import { useSearchParams } from 'next/navigation';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { MusicBrainzSearchModal } from '@/blocks/MusicBrainzSearchModal';
import { TracksTable } from '@/blocks/TracksTable/TracksTable';
import type {
  MusicBrainzSearchResult,
  Track,
} from '@/graphql/__generated__/graphql';
import { CREATE_ENRICHMENT_JOB } from '@/graphql/mutations/enrichmentJobs';
import { GET_CATEGORIES } from '@/graphql/queries/categories';
import { SEARCH_TRACKS } from '@/graphql/queries/tracks';

interface EnrichTracksFormProps {
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

interface PendingEnrichment {
  track: Track;
  musicbrainzReleaseId: string;
  musicbrainzResult: MusicBrainzSearchResult;
}

// Custom component to render category and subcategory
interface PrimarySecondaryProps {
  primary: string;
  secondary: string;
}

function PrimarySecondary({ primary, secondary }: PrimarySecondaryProps) {
  return (
    <div className="primary-secondary">
      <div className="primary-secondary__primary">{primary}</div>
      <div className="primary-secondary__secondary">{secondary}</div>
    </div>
  );
}

export function EnrichTracksForm({
  onSuccess,
  onError,
}: EnrichTracksFormProps) {
  const searchParams = useSearchParams();
  const trackId = searchParams.get('trackId');
  
  const [activeTab, setActiveTab] = useState('single');
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  const [currentTrackForSearch, setCurrentTrackForSearch] = useState<Track | null>(null);
  const [musicBrainzModal, setMusicBrainzModal] = useState(false);
  const [pendingEnrichments, setPendingEnrichments] = useState<PendingEnrichment[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Form for category filtering
  const filterForm = useForm({
    defaultValues: {
      category: '',
    },
  });

  // GraphQL
  const { data: tracksData, loading: tracksLoading } = useQuery(SEARCH_TRACKS, {
    variables: { 
      filters: categoryFilter ? { subcategoryId: categoryFilter } : {} 
    },
  });

  const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_CATEGORIES);

  const [createEnrichmentJob] = useMutation(CREATE_ENRICHMENT_JOB);

  const tracks = useMemo(() => {
    return (tracksData?.tracks?.items as Track[]) || [];
  }, [tracksData?.tracks?.items]);

  // Create autocomplete options from subcategories
  const subcategoryOptions = useMemo(() => {
    if (!categoriesData?.categories) return [];
    
    const allOption = { value: '', label: 'All Categories', category: '' };
    const subcategoryOpts = categoriesData.categories.flatMap(category =>
      category.subcategories.map(subcategory => ({
        value: subcategory.id,
        label: subcategory.name,
        category: category.name,
      }))
    );
    
    return [allOption, ...subcategoryOpts];
  }, [categoriesData?.categories]);

  // Handle category filter change
  const handleCategoryChange = useCallback((value: string | null) => {
    setCategoryFilter(value || '');
    filterForm.setValue('category', value || '');
  }, [filterForm]);

  // Auto-select and open MusicBrainz search for specific track from URL
  useEffect(() => {
    if (trackId && tracks.length > 0 && !currentTrackForSearch) {
      const targetTrack = tracks.find(track => track.id === trackId);
      if (targetTrack) {
        setCurrentTrackForSearch(targetTrack);
        setMusicBrainzModal(true);
      }
    }
  }, [trackId, tracks, currentTrackForSearch]);

  // Single track enrichment flow
  const handleSingleEnrich = useCallback((track: Track) => {
    setCurrentTrackForSearch(track);
    setMusicBrainzModal(true);
  }, []);

  // Bulk track enrichment flow - just open search for first track
  const handleBulkEnrich = useCallback(() => {
    if (selectedTrackIds.length === 0) {
      onError?.('Please select at least one track');
      return;
    }

    // Start with the first selected track
    const firstTrack = tracks.find(t => t.id === selectedTrackIds[0]);
    if (firstTrack) {
      setCurrentTrackForSearch(firstTrack);
      setMusicBrainzModal(true);
    }
  }, [selectedTrackIds, tracks, onError]);

  // Handle MusicBrainz selection
  const handleMusicBrainzSelect = useCallback(async (result: MusicBrainzSearchResult) => {
    if (!currentTrackForSearch) return;

    if (activeTab === 'single') {
      // For single track, create job immediately
      try {
        await createEnrichmentJob({
          variables: {
            input: {
              songId: parseInt(currentTrackForSearch.id),
              musicbrainzReleaseId: result.id,
            },
          },
        });

        onSuccess?.(`Created enrichment job for "${currentTrackForSearch.artist} - ${currentTrackForSearch.title}"`);
        
        setMusicBrainzModal(false);
        setCurrentTrackForSearch(null);
      } catch (error) {
        onError?.('Failed to create enrichment job');
        console.error('Enrichment job error:', error);
      }
    } else {
      // For bulk, add to pending list
      const newPending: PendingEnrichment = {
        track: currentTrackForSearch,
        musicbrainzReleaseId: result.id,
        musicbrainzResult: result,
      };
      
      setPendingEnrichments(prev => [...prev, newPending]);
      
      // Move to next track if there are more
      const currentIndex = selectedTrackIds.indexOf(currentTrackForSearch.id);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < selectedTrackIds.length) {
        const nextTrack = tracks.find(t => t.id === selectedTrackIds[nextIndex]);
        if (nextTrack) {
          setCurrentTrackForSearch(nextTrack);
          // Keep modal open for next track
          return;
        }
      }
      
      // No more tracks, close modal
      setMusicBrainzModal(false);
      setCurrentTrackForSearch(null);
    }
  }, [currentTrackForSearch, createEnrichmentJob, onSuccess, onError, activeTab, selectedTrackIds, tracks]);

  // Close modal handler
  const handleCloseMusicBrainz = useCallback(() => {
    setMusicBrainzModal(false);
    setCurrentTrackForSearch(null);
  }, []);

  // Execute all pending enrichments
  const handleExecutePendingEnrichments = useCallback(async () => {
    if (pendingEnrichments.length === 0) {
      onError?.('No pending enrichments to execute');
      return;
    }

    try {
      const jobPromises = pendingEnrichments.map(pending => 
        createEnrichmentJob({
          variables: {
            input: {
              songId: parseInt(pending.track.id),
              musicbrainzReleaseId: pending.musicbrainzReleaseId,
            },
          },
        })
      );

      await Promise.all(jobPromises);
      
      onSuccess?.(`Created ${pendingEnrichments.length} enrichment jobs for bulk processing`);
      setPendingEnrichments([]);
      setSelectedTrackIds([]);
    } catch (error) {
      onError?.('Failed to create bulk enrichment jobs');
      console.error('Bulk enrichment error:', error);
    }
  }, [pendingEnrichments, createEnrichmentJob, onSuccess, onError]);

  // Remove pending enrichment
  const handleRemovePending = useCallback((trackId: string) => {
    setPendingEnrichments(prev => prev.filter(p => p.track.id !== trackId));
  }, []);

  // Clear all pending
  const handleClearPending = useCallback(() => {
    setPendingEnrichments([]);
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
            {trackId ? (
              <>
                <h3>Enriching specific track</h3>
                <p className="enrich-tracks-form__instructions">
                  You were directed to enrich a specific track. The MusicBrainz search should open automatically.
                </p>
              </>
            ) : (
              <>
                <h3>Select a track to enrich</h3>
                <p className="enrich-tracks-form__instructions">
                  Click the &ldquo;Enrich&rdquo; button on any track to search for its metadata in MusicBrainz.
                </p>
              </>
            )}
            
            <div className="enrich-tracks-form__filters">
              <Controller
                name="category"
                control={filterForm.control}
                render={({ field }) => (
                  <Autocomplete
                    label="Filter by Category"
                    options={subcategoryOptions}
                    value={field.value}
                    onChange={handleCategoryChange}
                    renderOption={(option) => {
                      if (option.value === '') return option.label;
                      const subcategory = subcategoryOptions.find(s => s.value === option.value);
                      return subcategory ? (
                        <PrimarySecondary
                          primary={subcategory.label}
                          secondary={subcategory.category}
                        />
                      ) : option.label;
                    }}
                    disabled={categoriesLoading}
                    clearable={true}
                  />
                )}
              />
            </div>
            
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
              Select multiple tracks, search MusicBrainz for each one, then execute all enrichment jobs at once.
            </p>
            
            <div className="enrich-tracks-form__filters">
              <Controller
                name="category"
                control={filterForm.control}
                render={({ field }) => (
                  <Autocomplete
                    label="Filter by Category"
                    options={subcategoryOptions}
                    value={field.value}
                    onChange={handleCategoryChange}
                    renderOption={(option) => {
                      if (option.value === '') return option.label;
                      const subcategory = subcategoryOptions.find(s => s.value === option.value);
                      return subcategory ? (
                        <PrimarySecondary
                          primary={subcategory.label}
                          secondary={subcategory.category}
                        />
                      ) : option.label;
                    }}
                    disabled={categoriesLoading}
                    clearable={true}
                  />
                )}
              />
            </div>
            
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
                  Search MusicBrainz for Selected ({selectedTrackIds.length})
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setSelectedTrackIds([])}
                >
                  Clear Selection
                </Button>
              </div>
            )}

            {pendingEnrichments.length > 0 && (
              <div className="enrich-tracks-form__pending">
                <h4>Pending Enrichments ({pendingEnrichments.length})</h4>
                <div className="enrich-tracks-form__pending-list">
                  {pendingEnrichments.map((pending) => (
                    <div key={pending.track.id} className="enrich-tracks-form__pending-item">
                      <div className="enrich-tracks-form__pending-track">
                        <strong>{pending.track.artist} - {pending.track.title}</strong>
                      </div>
                      <div className="enrich-tracks-form__pending-release">
                        → {pending.musicbrainzResult.artist} - {pending.musicbrainzResult.title} ({pending.musicbrainzResult.score}%)
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        destructive
                        onClick={() => handleRemovePending(pending.track.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="enrich-tracks-form__pending-actions">
                  <Button onClick={handleExecutePendingEnrichments}>
                    Execute All Enrichment Jobs ({pendingEnrichments.length})
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleClearPending}
                  >
                    Clear All Pending
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Tabs.Content>
      </Tabs>

      <MusicBrainzSearchModal
        isOpen={musicBrainzModal}
        onClose={handleCloseMusicBrainz}
        onSelect={handleMusicBrainzSelect}
        initialValues={currentTrackForSearch ? {
          artist: currentTrackForSearch.artist,
          title: currentTrackForSearch.title,
          album: currentTrackForSearch.album || undefined,
        } : undefined}
      />
    </div>
  );
}