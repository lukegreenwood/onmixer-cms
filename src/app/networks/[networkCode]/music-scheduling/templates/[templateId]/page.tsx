import { ClockTemplateDetailPage } from '@/components/pages/ClockTemplateDetailPage';

interface PageProps {
  params: Promise<{ networkCode: string; templateId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { networkCode, templateId } = await params;
  
  return (
    <ClockTemplateDetailPage
      networkCode={networkCode}
      templateId={templateId}
    />
  );
}