import { Metadata } from 'next';

import { EpisodeEditPage } from '@/components';

export const metadata: Metadata = {
  title: 'Edit Episode',
};

export default async function EpisodeEditPageRoot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EpisodeEditPage id={id} />;
}
