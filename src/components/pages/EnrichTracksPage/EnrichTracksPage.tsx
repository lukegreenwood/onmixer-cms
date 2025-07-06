'use client';

import React, { Fragment } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { EnrichTracksForm } from '@/components/forms/EnrichTracksForm/EnrichTracksForm';
import { toast } from '@/lib/toast';

export function EnrichTracksPage() {
  const handleSuccess = (message: string) => {
    toast(message, 'success');
  };

  const handleError = (error: string) => {
    toast(error, 'error');
  };

  return (
    <Fragment>
      <PageHeader
        heading="Enrich Tracks"
        subheading="Search MusicBrainz and enrich track metadata"
      />
      <div className="page-content">
        <EnrichTracksForm onSuccess={handleSuccess} onError={handleError} />
      </div>
    </Fragment>
  );
}
