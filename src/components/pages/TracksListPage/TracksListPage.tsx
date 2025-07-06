'use client';

import { useQuery } from '@apollo/client';
import { Button } from '@soundwaves/components';
import React, { Fragment, useState } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { TracksTable } from '@/blocks/TracksTable/TracksTable';
import type { Track } from '@/graphql/__generated__/graphql';
import { SEARCH_TRACKS } from '@/graphql/queries/tracks';
import { toast } from '@/lib/toast';

export function TracksListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const { data, loading, refetch } = useQuery(SEARCH_TRACKS, {
    variables: {
      filters: {
        limit: 25,
        offset: (currentPage - 1) * 25,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const tracks = data?.tracks?.items || [];
  const totalCount = data?.tracks?.total || 0;

  const handleEnrich = (track: Track) => {
    toast(
      `Enrichment for track ${track.id} - navigate to Enrich Tracks page for full functionality`,
      'gray',
    );
  };

  const handleEdit = (trackId: string) => {
    toast(
      `Edit functionality for track ${trackId} not yet implemented`,
      'gray',
    );
  };

  const handleToggleEnabled = (trackId: string, enabled: boolean) => {
    toast(
      `Toggle enabled for track ${trackId} to ${enabled} not yet implemented`,
      'gray',
    );
  };

  const handleRefresh = () => {
    refetch();
    toast('Tracks list has been refreshed', 'success');
  };

  return (
    <Fragment>
      <PageHeader
        heading="Tracks"
        subheading="Browse and manage your music tracks library"
        actions={
          <Button onClick={handleRefresh} variant="outline">
            Refresh
          </Button>
        }
      />
      <div className="page-content">
        <TracksTable
          tracks={tracks}
          loading={loading}
          onEnrich={handleEnrich}
          onEdit={handleEdit}
          onToggleEnabled={handleToggleEnabled}
          showBulkActions={true}
          selectedTracks={selectedTracks}
          onSelectTracks={setSelectedTracks}
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Fragment>
  );
}
