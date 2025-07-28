import { ClockDetailPage } from '@/components/pages/ClockDetailPage';

interface PageProps {
  params: Promise<{ clockId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { clockId } = await params;
  
  return <ClockDetailPage clockId={clockId} />;
}