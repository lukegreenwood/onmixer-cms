import { Metadata } from 'next';

import { SeriesEditPage } from '@/components';

export const metadata: Metadata = {
  title: 'Edit Series',
};

export default async function SeriesEditPageRoot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SeriesEditPage id={id} />;
}
