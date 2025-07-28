import { ClockEditPage } from '@/components/pages/ClockEditPage';

interface PageProps {
  params: Promise<{ clockId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { clockId } = await params;
  
  return <ClockEditPage clockId={clockId} />;
}