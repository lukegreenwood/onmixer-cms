import { Suspense } from 'react';

import { TrackEditPage } from '@/components/pages';

export interface TrackEditRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TrackEditRoute({ params }: TrackEditRouteProps) {
  const { id } = await params;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackEditPage id={id} />
    </Suspense>
  );
}