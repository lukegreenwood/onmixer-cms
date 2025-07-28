'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Button } from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Card } from '@/components/blocks/Card';
import { DataTable } from '@/components/blocks/DataTable';
import { AddIcon, EditIcon, MusicIcon } from '@/components/icons';
import { GetMusicRulesQuery } from '@/graphql/__generated__/graphql';
import { GET_MUSIC_RULES } from '@/graphql/queries/musicRules';
import { useNavigation, useNetwork } from '@/hooks';

const columnHelper = createColumnHelper<GetMusicRulesQuery['musicRules'][number]>();

export const RuleList = () => {
  const { currentNetwork } = useNetwork();
  const { getNetworkRoutePath, push } = useNavigation();

  const { data } = useSuspenseQuery(GET_MUSIC_RULES, {
    variables: { networkId: currentNetwork?.id || '' },
  });

  const tableColumns = [
    columnHelper.accessor('name', {
      header: 'Rule Name',
      cell: (props) => (
        <div className="cell-content cell-content--with-icon">
          <MusicIcon className="cell-icon" />
          <span className="cell-title">{props.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('ruleType', {
      header: 'Type',
      cell: (props) => (
        <span className="status-badge status-badge--template">
          {props.getValue()?.replace('_', ' ')}
        </span>
      ),
    }),
    columnHelper.accessor('breakable', {
      header: 'Breakable',
      cell: (props) => {
        const breakable = props.getValue();
        const getBreakableClass = (value: string) => {
          switch (value) {
            case 'UNBREAKABLE': return 'status-badge--unbreakable';
            case 'BREAKABLE': return 'status-badge--breakable';
            case 'WARNING': return 'status-badge--warning';
            default: return 'status-badge--inactive';
          }
        };
        return (
          <span className={`status-badge ${getBreakableClass(breakable)}`}>
            {breakable}
          </span>
        );
      },
    }),
    columnHelper.accessor('value', {
      header: 'Value',
      cell: (props) => (
        <span>
          {props.getValue()} {props.row.original.unit?.toLowerCase()}
        </span>
      ),
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: (props) => (
        <div className="cell-content cell-content--with-indicator">
          <div className="priority-indicator priority-indicator--blue" />
          {props.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('isActive', {
      header: 'Status',
      cell: (props) => (
        <span className={`status-badge ${
          props.getValue() ? 'status-badge--active' : 'status-badge--inactive'
        }`}>
          {props.getValue() ? 'Active' : 'Inactive'}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (props) => (
        <div className="table-actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => push(getNetworkRoutePath('musicRuleEdit', [props.row.original.id]))}
          >
            <EditIcon className="icon" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: data.musicRules || [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (rule: GetMusicRulesQuery['musicRules'][number]) => {
    push(getNetworkRoutePath('musicRuleView', [rule.id]));
  };

  return (
    <div className="rule-list">
      <Card>
        <div className="rule-list__header">
          <div className="rule-list__title">
            <h2 className="rule-list__heading">Music Rules</h2>
            <p className="rule-list__description">Configure track selection and separation rules</p>
          </div>
          <Button
            variant="primary"
            onClick={() => push(getNetworkRoutePath('musicRuleCreate'))}
          >
            <AddIcon className="button-icon" />
            Create Rule
          </Button>
        </div>

        <DataTable
          table={table}
          onRowClick={handleRowClick}
          excludeRowClickColumns={['actions']}
        />
      </Card>
    </div>
  );
};