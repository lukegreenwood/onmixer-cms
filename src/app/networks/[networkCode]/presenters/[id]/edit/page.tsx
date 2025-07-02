import { PresenterEditPage } from '@/components';

export default async function PresenterEditPageRoot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PresenterEditPage id={id} />;
}
