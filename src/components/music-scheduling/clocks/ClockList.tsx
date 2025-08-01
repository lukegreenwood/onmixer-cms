'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Button } from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Card, DataTable, NetworkBadge } from '@/components';
import { GetMusicClocksQuery } from '@/graphql/__generated__/graphql';
import { GET_MUSIC_CLOCKS } from '@/graphql/queries/musicClocks';
import { useNavigation, useNetwork } from '@/hooks';
import { AddIcon, EditIcon, ClockIcon } from '@/icons';

const columnHelper =
  createColumnHelper<GetMusicClocksQuery['musicClocks'][number]>();

export const ClockList = () => {
  const { currentNetwork } = useNetwork();
  const { getNetworkRoutePath, push } = useNavigation();

  const { data } = useSuspenseQuery(GET_MUSIC_CLOCKS, {
    variables: { networkId: currentNetwork?.id || '' },
  });

  const tableColumns = [
    columnHelper.accessor('name', {
      header: 'Clock Name',
      cell: (props) => (
        <div className="cell-content cell-content--with-icon">
          <ClockIcon className="cell-icon" />
          <span className="cell-title">{props.getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (props) => (
        <span className="cell-description">
          {props.getValue() || 'No description'}
        </span>
      ),
    }),
    columnHelper.accessor('targetRuntime', {
      header: 'Target Runtime',
      cell: (props) => {
        const duration = props.getValue();
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return (
          <span>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        );
      },
    }),
    columnHelper.accessor('items', {
      header: 'Items',
      cell: (props) => (
        <span className="cell-meta">{props.getValue()?.length || 0} items</span>
      ),
    }),
    columnHelper.accessor('network', {
      header: 'Network',
      cell: (props) => <NetworkBadge network={props.getValue()} />,
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (props) => (
        <div className="table-actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              push(
                getNetworkRoutePath('musicClockEdit', [props.row.original.id]),
              )
            }
          >
            <EditIcon className="icon" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: data.musicClocks || [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (
    clock: GetMusicClocksQuery['musicClocks'][number],
  ) => {
    push(getNetworkRoutePath('musicClockView', [clock.id]));
  };

  return (
    <div className="clock-list">
      <Card>
        <div className="clock-list__header">
          <div className="clock-list__title">
            <h2 className="clock-list__heading">Music Clocks</h2>
            <p className="clock-list__description">
              Manage hourly programming templates
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => push(getNetworkRoutePath('musicClockCreate'))}
          >
            <AddIcon className="button-icon" />
            Create Clock
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
