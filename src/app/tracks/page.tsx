import { Loading } from '@soundwaves/components';
import { Suspense } from 'react';

import { TracksListPage } from '@/pages/TracksListPage/TracksListPage';

export default function TracksRoute() {
  return (
    <Suspense fallback={<Loading size="xl" />}>
      <TracksListPage />
    </Suspense>
  );
}
