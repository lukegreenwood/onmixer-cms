'use client';

import { useQuery, useSuspenseQuery } from '@apollo/client';
import { Alert, Badge, Tag } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { NetworkBadge } from '@/components';
import { NetworksIcon, ShowsIcon, SeriesIcon } from '@/components/icons';
import {
  GetNetworksQuery,
  OrderDirection,
  SearchSeriesQuery,
  SearchShowsQuery,
  SeriesOrderField,
  OperatorType,
  ShowFilterType,
  ShowTextFilterField,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import { GET_NETWORKS, SEARCH_SERIES, SEARCH_SHOWS } from '@/graphql/queries';
import { useNavigation, useNetwork } from '@/hooks';
import { convertFiltersStateToSeriesGraphQL } from '@/utils/filtersToGraphql';

import { DataTable } from '../DataTable';
import { DataTableFilter, useDataTableFilters } from '../DataTableFilter';
import { createColumnConfigHelper } from '../DataTableFilter/core/filters';
import { FiltersState } from '../DataTableFilter/core/types';
import { Pagination } from '../Pagination';

const columnHelper =
  createColumnHelper<SearchSeriesQuery['seriesListV2']['items'][number]>();

const tableColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.accessor('shortName', {
    header: 'Short Name',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('show', {
    header: 'Show',
    cell: (props) => props.getValue().shortName,
  }),
  columnHelper.accessor('network', {
    header: 'Network',
    cell: (props) => <NetworkBadge network={props.getValue()} />,
  }),
  columnHelper.display({
    id: 'status',
    header: 'Status',
    cell: (props) => {
      const series = props.row.original;
      return series.archived ? (
        <Badge color="red">Archived</Badge>
      ) : (
        <Badge color="green">Active</Badge>
      );
    },
  }),
];

const columnConfigHelper =
  createColumnConfigHelper<
    SearchSeriesQuery['seriesListV2']['items'][number]
  >();
const columnsConfig = [
  columnConfigHelper
    .number()
    .id('id')
    .accessor((row) => row.id)
    .displayName('ID')
    .icon(SeriesIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('shortName')
    .accessor((row) => row.shortName)
    .displayName('Short Name')
    .icon(SeriesIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('fullName')
    .accessor((row) => row.fullName)
    .displayName('Full Name')
    .icon(SeriesIcon)
    .build(),
  columnConfigHelper
    .multiOption()
    .id('shows')
    .accessor((row) => [row.show.id])
    .displayName('Shows')
    .icon(ShowsIcon)
    .build(),
  columnConfigHelper
    .multiOption()
    .id('networks')
    .accessor((row) => [row.network.id])
    .displayName('Networks')
    .icon(NetworksIcon)
    .build(),
  columnConfigHelper
    .boolean()
    .id('archived')
    .accessor((row) => row.archived)
    .displayName('Archived')
    .icon(SeriesIcon)
    .build(),
] as const;

const makeOptions = (
  data: GetNetworksQuery['networks'] | SearchShowsQuery['showsV2']['items'],
): Array<{ value: string; label: string }> => {
  if (data.length > 0 && data[0]?.__typename === 'Network') {
    return (data as GetNetworksQuery['networks']).map((network) => ({
      value: network.id,
      label: network.name,
    }));
  }

  return (data as SearchShowsQuery['showsV2']['items']).map((show) => ({
    value: show.id,
    label: show.shortName,
  }));
};

const SERIES_PER_PAGE = 30;

export const SeriesTable = () => {
  const { currentNetwork } = useNetwork();
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');

  const offset = (page - 1) * SERIES_PER_PAGE;

  const [filtersState, setFiltersState] = useState<FiltersState>([
    {
      columnId: 'networks',
      operator: 'include',
      type: 'multiOption',
      values: [currentNetwork?.id ?? ''],
    },
    {
      columnId: 'archived',
      operator: 'is',
      type: 'boolean',
      values: [false],
    },
  ]);

  // Convert filters to GraphQL format
  const graphqlFilters = useMemo(
    () => convertFiltersStateToSeriesGraphQL(filtersState),
    [filtersState],
  );

  const { data, error } = useSuspenseQuery(SEARCH_SERIES, {
    variables: {
      filters: {
        ...graphqlFilters,
        limit: SERIES_PER_PAGE,
        offset,
        order: [
          {
            field: SeriesOrderField.Id,
            direction: OrderDirection.Descending,
          },
        ],
      },
    },
  });

  const { data: networks } = useSuspenseQuery(GET_NETWORKS);

  const {
    data: shows,
    refetch: refetchShows,
    loading: showsLoading,
  } = useQuery(SEARCH_SHOWS, {
    variables: {
      filters: {
        limit: 20,
      },
    },
  });

  const handleFiltersChange = (
    newFilters: FiltersState | ((prevState: FiltersState) => FiltersState),
  ) => {
    setFiltersState(newFilters);
    // Reset to page 1 when filters change, but only if we're not already on page 1
    if (page !== 1) {
      router.push('?page=1');
    }
  };

  const handleShowSearch = (searchTerm: string) => {
    refetchShows({
      filters: {
        limit: 20,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: ShowFilterType.Text,
              textFilter: {
                value: searchTerm,
                field: ShowTextFilterField.ShortName,
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    });
  };

  const debouncedHandleShowSearch = useDebouncer(handleShowSearch, {
    wait: 500,
  });

  const { filters, columns, actions, strategy } = useDataTableFilters({
    strategy: 'server',
    data: data.seriesListV2.items,
    filters: filtersState,
    onFiltersChange: handleFiltersChange,
    columnsConfig,
    options: {
      shows: makeOptions(shows?.showsV2.items ?? []),
      networks: makeOptions(networks.networks),
    },
    onOptionSearch: {
      shows: (searchTerm: string) => {
        debouncedHandleShowSearch.maybeExecute(searchTerm);
      },
    },
    optionsLoading: {
      shows: showsLoading,
      networks: false,
    },
  });

  const table = useReactTable({
    data: data.seriesListV2.items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const handleRowClick = (
    row: SearchSeriesQuery['seriesListV2']['items'][number],
  ) => {
    router.push(getNetworkRoutePath('seriesEdit', [row.id]));
  };

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching series">
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
      <div className="card card--flush">
        <DataTable
          className="data-table--contained"
          table={table}
          onRowClick={handleRowClick}
        />
        <Pagination
          className="pagination--contained"
          total={data.seriesListV2.total}
          amount={SERIES_PER_PAGE}
          currentPage={page}
          onPageChange={handlePageChange}
          entity="series"
        />
      </div>
    </div>
  );
};
