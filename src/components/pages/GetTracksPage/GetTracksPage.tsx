'use client';

import React, { Fragment } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { GetTracksForm } from '@/components/forms/GetTracksForm/GetTracksForm';

export function GetTracksPage() {
  return (
    <Fragment>
      <PageHeader
        heading="Get Tracks"
        subheading="Search YouTube and download music tracks"
      />
      <div className="page-content">
        <GetTracksForm />
      </div>
    </Fragment>
  );
}
