import { Suspense } from 'react';

import { TracksListPage } from '@/pages/TracksListPage/TracksListPage';

export default function TracksRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TracksListPage />
    </Suspense>
  );
}