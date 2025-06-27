import { Metadata } from 'next';

import { ShowEditPage } from '@/components';

export const metadata: Metadata = {
  title: 'Edit Show',
};

export default async function ShowEditPageRoot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ShowEditPage id={id} />;
}
