'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Alert, Badge, Tag } from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { NetworksIcon, PresentersIcon, ShowsIcon } from '@/components/icons';
import {
  GetNetworksQuery,
  GetPresentersQuery,
  SearchShowsQuery,
} from '@/graphql/__generated__/graphql';
import { GET_NETWORKS, GET_PRESENTERS, SEARCH_SHOWS } from '@/graphql/queries';
import { useNetwork } from '@/hooks';
import { convertFiltersStateToGraphQL } from '@/utils/filtersToGraphql';

import { DataTable } from '../DataTable';
import { DataTableFilter, useDataTableFilters } from '../DataTableFilter';
import { createColumnConfigHelper } from '../DataTableFilter/core/filters';
import { FiltersState } from '../DataTableFilter/core/types';

const columnHelper =
  createColumnHelper<SearchShowsQuery['showsV2']['items'][number]>();

const tableColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.display({
    id: 'image',
    header: 'Image',
    cell: (props) => {
      return (
        <div className="preview-image">
          <img
            src={props.row.original.featuredImage.urls.square}
            alt={props.row.original.shortName}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor('shortName', {
    header: 'Short Name',
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
        <Tag
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
        </Tag>
      )),
  }),
  columnHelper.accessor('hidden', {
    header: 'Status',
    cell: (props) =>
      props.getValue() ? (
        <Badge color="red">Hidden</Badge>
      ) : (
        <Badge color="green">Visible</Badge>
      ),
  }),
];

const columnConfigHelper =
  createColumnConfigHelper<SearchShowsQuery['showsV2']['items'][number]>();
const columnsConfig = [
  columnConfigHelper
    .text()
    .id('id')
    .accessor((row) => row.id)
    .displayName('ID')
    .icon(ShowsIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('shortName')
    .accessor((row) => row.shortName)
    .displayName('Short Name')
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
    .boolean()
    .id('hidden')
    .accessor((row) => row.hidden)
    .displayName('Hidden')
    .icon(ShowsIcon)
    .build(),
] as const;

const makeOptions = (
  data:
    | GetNetworksQuery['networks']
    | GetPresentersQuery['presenters']['items'],
) => {
  if (data[0].__typename === 'Network') {
    return data.map((network) => ({ value: network.id, label: network.name }));
  }

  return data.map((presenter) => ({
    value: presenter.id,
    label: presenter.name,
  }));
};

export const ShowsTable = () => {
  const { currentNetwork } = useNetwork();
  const [filtersState, setFiltersState] = useState<FiltersState>([
    {
      columnId: 'networks',
      operator: 'include',
      type: 'multiOption',
      values: [currentNetwork?.id ?? ''],
    },
  ]);

  // Convert filters to GraphQL format
  const graphqlFilters = useMemo(
    () => convertFiltersStateToGraphQL(filtersState),
    [filtersState],
  );

  const { data, error } = useSuspenseQuery(SEARCH_SHOWS, {
    variables: { filters: graphqlFilters },
  });
  const { data: networks } = useSuspenseQuery(GET_NETWORKS);
  const { data: presenters } = useSuspenseQuery(GET_PRESENTERS);

  const { filters, columns, actions, strategy } = useDataTableFilters({
    strategy: 'server',
    data: data.showsV2.items,
    filters: filtersState,
    onFiltersChange: setFiltersState,
    columnsConfig,
    options: {
      presenters: makeOptions(presenters.presenters.items),
      networks: makeOptions(networks.networks),
    },
    // faceted: {
    //   presenters: makeFaceted(presenters.presenters.items),
    //   networks: makeFaceted(networks.networks),
    // },
  });

  console.log(filters);
  console.log(data);

  const table = useReactTable({
    data: data.showsV2.items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching shows">
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
      <DataTable table={table} />
    </div>
  );
};
