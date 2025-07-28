import { RuleEditor } from '@/components/music-scheduling/rules/RuleEditor';

interface EditRulePageProps {
  params: Promise<{
    networkCode: string;
    ruleId: string;
  }>;
}

export default async function EditRulePage({ params }: EditRulePageProps) {
  const { ruleId } = await params;
  return <RuleEditor ruleId={ruleId} />;
}