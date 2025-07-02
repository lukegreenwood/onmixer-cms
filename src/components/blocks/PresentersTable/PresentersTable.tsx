'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Alert } from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { NetworksIcon, PresentersIcon } from '@/components/icons';
import {
  GetNetworksQuery,
  GetPresentersQuery,
  OrderDirection,
  PresenterOrderField,
} from '@/graphql/__generated__/graphql';
import { GET_NETWORKS, GET_PRESENTERS } from '@/graphql/queries';
import { useNavigation, useNetwork } from '@/hooks';

import { DataTable } from '../DataTable';
import { DataTableFilter, useDataTableFilters } from '../DataTableFilter';
import { createColumnConfigHelper } from '../DataTableFilter/core/filters';
import { FiltersState } from '../DataTableFilter/core/types';
import { Pagination } from '../Pagination';

const columnHelper =
  createColumnHelper<GetPresentersQuery['presentersV2']['items'][number]>();

const tableColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.display({
    id: 'image',
    header: 'Image',
    cell: (props) => {
      const picture = props.row.original.picture;
      return (
        <div className="preview-image">
          {picture ? (
            <img src={picture} alt={props.row.original.name} />
          ) : (
            <div className="preview-image__placeholder">
              <PresentersIcon size={16} />
            </div>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => props.getValue(),
  }),
];

const columnConfigHelper =
  createColumnConfigHelper<
    GetPresentersQuery['presentersV2']['items'][number]
  >();

const columnsConfig = [
  columnConfigHelper
    .number()
    .id('id')
    .accessor((row) => row.id)
    .displayName('ID')
    .icon(PresentersIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('name')
    .accessor((row) => row.name)
    .displayName('Name')
    .icon(PresentersIcon)
    .build(),
  columnConfigHelper
    .multiOption()
    .id('networks')
    .accessor((row) => row.networks?.map((network) => network.id) || [])
    .displayName('Networks')
    .icon(NetworksIcon)
    .build(),
  columnConfigHelper
    .boolean()
    .id('hidden')
    .accessor((row) => row.hidden)
    .displayName('Hidden')
    .icon(PresentersIcon)
    .build(),
] as const;

const makeOptions = (data: GetNetworksQuery['networks']) => {
  return data.map((network) => ({ value: network.id, label: network.name }));
};

const PRESENTERS_PER_PAGE = 30;

export const PresentersTable = () => {
  const { currentNetwork } = useNetwork();
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');

  const offset = (page - 1) * PRESENTERS_PER_PAGE;

  const [filtersState, setFiltersState] = useState<FiltersState>([
    {
      columnId: 'networks',
      operator: 'include',
      type: 'multiOption',
      values: [currentNetwork?.id ?? ''],
    },
    {
      columnId: 'hidden',
      operator: 'is',
      type: 'boolean',
      values: [false],
    },
  ]);

  const { data, error } = useSuspenseQuery(GET_PRESENTERS, {
    variables: {
      filters: {
        limit: PRESENTERS_PER_PAGE,
        offset,
        includeHidden: true,
        order: [
          {
            field: PresenterOrderField.Id,
            direction: OrderDirection.Descending,
          },
        ],
      },
    },
  });

  const { data: networks } = useSuspenseQuery(GET_NETWORKS);

  const handleFiltersChange = (
    newFilters: FiltersState | ((prevState: FiltersState) => FiltersState),
  ) => {
    setFiltersState(newFilters);
    // Reset to page 1 when filters change, but only if we're not already on page 1
    if (page !== 1) {
      router.push('?page=1');
    }
  };

  const { filters, columns, actions, strategy } = useDataTableFilters({
    strategy: 'client', // Using client-side filtering for now since we don't have advanced presenter filtering
    data: data.presentersV2.items,
    filters: filtersState,
    onFiltersChange: handleFiltersChange,
    columnsConfig,
    options: {
      networks: makeOptions(networks.networks),
    },
  });

  const table = useReactTable({
    data: data.presentersV2.items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const handleRowClick = (
    row: GetPresentersQuery['presentersV2']['items'][number],
  ) => {
    router.push(getNetworkRoutePath('presenterEdit', [row.id]));
  };

  if (error) {
    return (
      <div className="page-content">
        <Alert
          variant="expanded"
          color="error"
          title="Error fetching presenters"
        >
          {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <DataTableFilter
        filters={filters}
        columns={columns}
        actions={actions}
        strategy={strategy}
      />
      <DataTable table={table} onRowClick={handleRowClick} />
      <Pagination
        total={data.presentersV2.total}
        amount={PRESENTERS_PER_PAGE}
        currentPage={page}
        onPageChange={handlePageChange}
        entity="presenters"
      />
    </div>
  );
};
