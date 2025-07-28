'use client';

import { PageHeader } from '@/components/blocks/PageHeader';
import { PlaylistGenerator } from '@/components/music-scheduling/playlists/PlaylistGenerator';

export const MusicSchedulingPage = () => {
  return (
    <div className="music-scheduling-page">
      <PageHeader
        heading="Music Scheduling"
        subheading="Manage automated music programming and generate playlists"
      />

      <div className="page-content">
        <PlaylistGenerator />
      </div>
    </div>
  );
};
