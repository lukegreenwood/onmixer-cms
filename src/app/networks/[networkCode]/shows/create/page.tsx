import { Metadata } from 'next';

import { ShowCreatePage } from '@/components';

export const metadata: Metadata = {
  title: 'Create Show',
};

export default function ShowCreatePageRoot() {
  return <ShowCreatePage />;
}
