import { Suspense } from 'react';

import { EnrichTracksPage } from '@/pages/EnrichTracksPage/EnrichTracksPage';

export default function EnrichTracksRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnrichTracksPage />
    </Suspense>
  );
}