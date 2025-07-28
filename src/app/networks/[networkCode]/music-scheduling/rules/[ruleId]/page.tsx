import { RuleDetailPage } from '@/components/pages/RuleDetailPage';

interface RuleDetailPageProps {
  params: Promise<{
    networkCode: string;
    ruleId: string;
  }>;
}

export default async function RuleDetail({ params }: RuleDetailPageProps) {
  const { ruleId } = await params;
  return <RuleDetailPage ruleId={ruleId} />;
}