import { ClockTemplateEditPage } from '@/components/pages/ClockTemplateEditPage';

interface PageProps {
  params: Promise<{ networkCode: string; templateId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { networkCode, templateId } = await params;
  
  return (
    <ClockTemplateEditPage
      networkCode={networkCode}
      templateId={templateId}
    />
  );
}