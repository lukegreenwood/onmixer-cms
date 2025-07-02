import { Metadata } from 'next';

import { SeriesCreatePage } from '@/components';

export const metadata: Metadata = {
  title: 'Create Series',
};

export default function SeriesCreatePageRoot() {
  return <SeriesCreatePage />;
}
