import { NetworkEditPage } from '@/components/pages/NetworkEditPage';

interface PageProps {
  params: Promise<{ networkCode: string }>;
}

export default async function Page({ params }: PageProps) {
  const { networkCode } = await params;
  
  return <NetworkEditPage networkCode={networkCode} />;
}
