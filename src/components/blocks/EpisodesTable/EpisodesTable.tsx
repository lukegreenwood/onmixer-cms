'use client';

import { useQuery, useSuspenseQuery } from '@apollo/client';
import { Alert, Badge, Checkbox, Tooltip } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Copyable, DataTable } from '@/components';
import {
  GetNetworksQuery,
  GetPresentersQuery,
  OrderDirection,
  PresenterOrderField,
  SearchEpisodesV2Query,
  EpisodeOrderField,
  OperatorType,
  PresenterFilterType,
  PresenterTextFilterField,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import {
  GET_NETWORKS,
  GET_PRESENTERS,
  SEARCH_EPISODES_V2,
} from '@/graphql/queries';
import { useNavigation, useNetwork } from '@/hooks';
import {
  NetworksIcon,
  PresentersIcon,
  ShowsIcon,
  SeriesIcon,
  EpisodesIcon,
  BroadcastsIcon,
} from '@/icons';
import { convertFiltersStateToEpisodeGraphQL } from '@/utils/filtersToGraphql';

import {
  createColumnConfigHelper,
  DataTableFilter,
  FiltersState,
  useDataTableFilters,
} from '../DataTableFilter';
import { Pagination } from '../Pagination';

const columnHelper =
  createColumnHelper<SearchEpisodesV2Query['episodesV2']['items'][number]>();

const tableColumns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.display({
    id: 'image',
    header: 'Image',
    cell: (props) => {
      const episode = props.row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="preview-image">
            {episode.featuredImage?.urls?.square ? (
              <img src={episode.featuredImage.urls.square} alt={episode.name} />
            ) : (
              <div className="preview-image__placeholder">
                <ShowsIcon />
              </div>
            )}
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor('shortId', {
    header: 'Short ID',
    cell: (props) => (
      <Copyable value={props.getValue()}>
        <Badge color="gray" size="sm">
          {props.getValue()}
        </Badge>
      </Copyable>
    ),
  }),
  columnHelper.accessor('show', {
    header: 'Show',
    cell: (props) => props.getValue().shortName,
  }),
  columnHelper.accessor('name', {
    header: 'Title',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('presenters', {
    header: 'Presenters',
    cell: (props) =>
      props
        .getValue()
        .map((presenter) => presenter.name)
        .join(', '),
  }),
  columnHelper.accessor('networks', {
    header: 'Networks',
    cell: (props) =>
      props.getValue().map((network) => (
        <Badge
          key={network.id}
          color="blue"
          size="md"
          before={
            <div
              className="network-icon network-icon--sm"
              dangerouslySetInnerHTML={{
                __html: network.logoSvgIcon,
              }}
            />
          }
        >
          {network.name}
        </Badge>
      )),
  }),
  columnHelper.accessor('broadcasts', {
    header: 'Broadcasts',
    cell: (props) => {
      const broadcasts = props.getValue();
      return (
        <Badge color="purple" size="sm" before={<BroadcastsIcon />}>
          {broadcasts.length}
        </Badge>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created',
    cell: (props) => (
      <Tooltip content={new Date(props.getValue()).toISOString()}>
        {new Date(props.getValue()).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </Tooltip>
    ),
  }),
];

const columnConfigHelper =
  createColumnConfigHelper<
    SearchEpisodesV2Query['episodesV2']['items'][number]
  >();
const columnsConfig = [
  columnConfigHelper
    .number()
    .id('id')
    .accessor((row) => row.id)
    .displayName('ID')
    .icon(EpisodesIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('shortId')
    .accessor((row) => row.shortId)
    .displayName('Short ID')
    .icon(EpisodesIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('name')
    .accessor((row) => row.name)
    .displayName('Title')
    .icon(EpisodesIcon)
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
    .id('presenters')
    .accessor((row) => row.presenters.map((presenter) => presenter.id))
    .displayName('Presenters')
    .icon(PresentersIcon)
    .build(),
  columnConfigHelper
    .multiOption()
    .id('networks')
    .accessor((row) => row.networks.map((network) => network.id))
    .displayName('Networks')
    .icon(NetworksIcon)
    .build(),
  columnConfigHelper
    .option()
    .id('series')
    .accessor((row) => (row.series ? row.series.id : null))
    .displayName('Series')
    .icon(SeriesIcon)
    .build(),
  columnConfigHelper
    .boolean()
    .id('hasSeries')
    .accessor((row) => Boolean(row.series))
    .displayName('Has Series')
    .icon(SeriesIcon)
    .build(),
] as const;

const makeOptions = (
  data:
    | GetNetworksQuery['networks']
    | GetPresentersQuery['presentersV2']['items'],
) => {
  if (data.length > 0 && data[0]?.__typename === 'Network') {
    return data.map((network) => ({ value: network.id, label: network.name }));
  }

  return data.map((presenter) => ({
    value: presenter.id,
    label: presenter.name,
  }));
};

const EPISODES_PER_PAGE = 50;

export const EpisodesTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const { currentNetwork } = useNetwork();
  const { getNetworkRoutePath } = useNavigation();

  const offset = (page - 1) * EPISODES_PER_PAGE;

  const [filtersState, setFiltersState] = useState<FiltersState>([
    {
      columnId: 'networks',
      operator: 'include',
      type: 'multiOption',
      values: [currentNetwork?.id ?? ''],
    },
  ]);
  const [rowSelection, setRowSelection] = useState({});

  const graphqlFilters = useMemo(
    () =>
      convertFiltersStateToEpisodeGraphQL(filtersState, {
        limit: EPISODES_PER_PAGE,
        offset,
      }),
    [filtersState, offset],
  );

  const { data, error } = useSuspenseQuery(SEARCH_EPISODES_V2, {
    variables: {
      filters: {
        ...graphqlFilters,
        order: [
          {
            field: EpisodeOrderField.Id,
            direction: OrderDirection.Descending,
          },
        ],
      },
    },
  });

  const { data: networks } = useSuspenseQuery(GET_NETWORKS);
  const {
    data: presenters,
    refetch: refetchPresenters,
    loading: presentersLoading,
  } = useQuery(GET_PRESENTERS, {
    variables: {
      filters: {
        limit: 20,
        order: [
          {
            field: PresenterOrderField.Id,
            direction: OrderDirection.Ascending,
          },
        ],
      },
    },
  });

  const handleFiltersChange = (
    newFilters: FiltersState | ((prevState: FiltersState) => FiltersState),
  ) => {
    setFiltersState(newFilters);
    if (page !== 1) {
      router.push('?page=1');
    }
  };

  const handlePresenterSearch = (searchTerm: string) => {
    refetchPresenters({
      filters: {
        limit: 20,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: PresenterFilterType.Text,
              textFilter: {
                value: searchTerm,
                field: PresenterTextFilterField.Name,
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    });
  };

  const debouncedHandlePresenterSearch = useDebouncer(handlePresenterSearch, {
    wait: 500,
  });

  const { filters, columns, actions, strategy } = useDataTableFilters({
    strategy: 'server',
    data: data.episodesV2.items,
    filters: filtersState,
    onFiltersChange: handleFiltersChange,
    columnsConfig,
    options: {
      presenters: makeOptions(presenters?.presentersV2.items ?? []),
      networks: makeOptions(networks.networks),
      shows: [], //makeOptions(data.shows.items),
      series: [], //makeOptions(data.series.items),
    },
    onOptionSearch: {
      presenters: (searchTerm: string) => {
        debouncedHandlePresenterSearch.maybeExecute(searchTerm);
      },
      shows: (searchTerm: string) => {
        console.log('Searching shows:', searchTerm);
        // Here you would implement external API search
        // e.g., refetch shows data with search term
      },
      series: (searchTerm: string) => {
        console.log('Searching series:', searchTerm);
        // Here you would implement external API search
        // e.g., refetch series data with search term
      },
    },
    optionsLoading: {
      presenters: presentersLoading,
      shows: false, // Set to true when loading
      series: false, // Set to true when loading
    },
  });

  const table = useReactTable({
    data: data.episodesV2.items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
  });

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const handleRowClick = (
    row: SearchEpisodesV2Query['episodesV2']['items'][number],
  ) => {
    router.push(getNetworkRoutePath('episodesEdit', [row.id]));
  };

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching episodes">
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
          total={data.episodesV2.total}
          amount={EPISODES_PER_PAGE}
          currentPage={page}
          onPageChange={handlePageChange}
          entity="Episodes"
        />
      </div>
    </div>
  );
};
