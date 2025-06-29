import { Metadata } from 'next';

import { EpisodeCreatePage } from '@/components';

export const metadata: Metadata = {
  title: 'Create Episode',
};

export default function EpisodeCreatePageRoot() {
  return <EpisodeCreatePage />;
}
