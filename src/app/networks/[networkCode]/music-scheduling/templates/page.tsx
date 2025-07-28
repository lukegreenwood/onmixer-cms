import { MusicClockTemplatesPage } from '@/components/pages/MusicClockTemplatesPage';

interface PageProps {
  params: Promise<{ networkCode: string }>;
}

export default async function Page({ params }: PageProps) {
  const { networkCode } = await params;
  
  return <MusicClockTemplatesPage networkCode={networkCode} />;
}