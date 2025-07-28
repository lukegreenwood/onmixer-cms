'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Button } from '@soundwaves/components';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/blocks/Card';
import { PageHeader } from '@/components/blocks/PageHeader';
import { EditIcon } from '@/components/icons';
import { GET_MUSIC_RULE } from '@/graphql/queries/musicRules';
import { useNetwork } from '@/hooks';

interface RuleDetailPageProps {
  ruleId: string;
}

export const RuleDetailPage = ({ ruleId }: RuleDetailPageProps) => {
  const { currentNetwork } = useNetwork();
  const router = useRouter();

  const { data } = useSuspenseQuery(GET_MUSIC_RULE, {
    variables: { id: ruleId },
  });

  const rule = data.musicRule;

  if (!rule) {
    return <div>Rule not found</div>;
  }

  return (
    <div className="rule-detail-page">
      <PageHeader
        heading={rule.name}
        subheading="Music rule details and criteria"
        backTo={`/networks/${currentNetwork?.code}/music-scheduling/rules`}
        actions={
          <Button
            variant="primary"
            onClick={() =>
              router.push(`/networks/${currentNetwork?.code}/music-scheduling/rules/${rule.id}/edit`)
            }
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Edit Rule
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Rule Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Type</label>
              <p className="text-sm">{rule.ruleType?.replace('_', ' ')}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Breakable</label>
              <p className="text-sm">{rule.breakable}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Value</label>
              <p className="text-sm">{rule.value} {rule.unit?.toLowerCase()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Priority</label>
              <p className="text-sm">{rule.priority}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-sm">{rule.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Criteria</h3>
          <div className="space-y-3">
            {rule.criteria?.categories && rule.criteria.categories.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Categories</label>
                <p className="text-sm">{rule.criteria.categories.join(', ')}</p>
              </div>
            )}
            {rule.criteria?.genres && rule.criteria.genres.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Genres</label>
                <p className="text-sm">{rule.criteria.genres.join(', ')}</p>
              </div>
            )}
            {rule.criteria?.artists && rule.criteria.artists.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500">Artists</label>
                <p className="text-sm">{rule.criteria.artists.join(', ')}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};