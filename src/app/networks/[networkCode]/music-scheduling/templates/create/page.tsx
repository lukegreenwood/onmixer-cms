import { ClockTemplateCreatePage } from '@/components/pages/ClockTemplateCreatePage';

interface PageProps {
  params: Promise<{ networkCode: string }>;
}

export default async function Page({ params }: PageProps) {
  const { networkCode } = await params;
  
  return <ClockTemplateCreatePage networkCode={networkCode} />;
}