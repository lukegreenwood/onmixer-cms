'use client';

import { useQuery } from '@apollo/client';
import { Alert, Badge, Button, Checkbox, Input } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { Pagination } from '@/blocks/Pagination/Pagination';
import { Copyable, DataTable } from '@/components';
import {
  createColumnConfigHelper,
  DataTableFilter,
  FiltersState,
  useDataTableFilters,
} from '@/components/blocks/DataTableFilter';
import type {
  SearchTracksV2Query,
  TrackListInputV2,
  TrackTextFilterField,
  TrackBooleanFilterField,
} from '@/graphql/__generated__/graphql';
import {
  TrackFilterType,
  TextFilterOperator,
  BooleanFilterOperator,
  OperatorType,
} from '@/graphql/__generated__/graphql';
import { SEARCH_TRACKS_V2 } from '@/graphql/queries/tracks';
import { TrackIcon } from '@/icons';
import { toast } from '@/lib/toast';

// Helper function to convert filters to GraphQL format
const convertFiltersStateToTrackGraphQL = (
  filtersState: FiltersState,
  options: { limit: number; offset: number },
): TrackListInputV2 => {
  const filterGroup = {
    operator: OperatorType.And,
    filters: filtersState
      .map((filter) => {
        switch (filter.type) {
          case 'text':
            return {
              type: TrackFilterType.Text,
              textFilter: {
                field: filter.columnId as TrackTextFilterField,
                operator:
                  filter.operator === 'contains'
                    ? TextFilterOperator.Contains
                    : TextFilterOperator.Equals,
                value: Array.isArray(filter.values)
                  ? filter.values[0]
                  : filter.values || '',
              },
            };
          case 'boolean':
            return {
              type: TrackFilterType.Boolean,
              booleanFilter: {
                field: filter.columnId as TrackBooleanFilterField,
                operator: BooleanFilterOperator.Is,
                value: Array.isArray(filter.values)
                  ? filter.values[0]
                  : filter.values,
              },
            };
          default:
            return null;
        }
      })
      .filter(
        (filter): filter is NonNullable<typeof filter> => filter !== null,
      ),
  };

  return {
    ...options,
    ...(filterGroup.filters.length > 0 && { filterGroup }),
  };
};

const columnHelper =
  createColumnHelper<SearchTracksV2Query['tracksV2']['items'][number]>();

const columnConfigHelper =
  createColumnConfigHelper<SearchTracksV2Query['tracksV2']['items'][number]>();

const columnsConfig = [
  columnConfigHelper
    .text()
    .id('title')
    .accessor((row) => row.title)
    .displayName('Title')
    .icon(TrackIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('artist')
    .accessor((row) => row.artist)
    .displayName('Artist')
    .icon(TrackIcon)
    .build(),
  columnConfigHelper
    .text()
    .id('album')
    .accessor((row) => row.album)
    .displayName('Album')
    .icon(TrackIcon)
    .build(),
  columnConfigHelper
    .boolean()
    .id('enabled')
    .accessor((row) => row.enabled)
    .displayName('Enabled')
    .icon(TrackIcon)
    .build(),
] as const;

const TRACKS_PER_PAGE = 50;

export function TracksListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');

  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get('search') ?? '',
  );
  const [filtersState, setFiltersState] = useState<FiltersState>([]);

  const offset = (page - 1) * TRACKS_PER_PAGE;

  const graphqlFilters = useMemo(
    () =>
      convertFiltersStateToTrackGraphQL(filtersState, {
        limit: TRACKS_PER_PAGE,
        offset,
      }),
    [filtersState, offset],
  );

  const { data, loading, error, refetch } = useQuery(SEARCH_TRACKS_V2, {
    variables: { filters: graphqlFilters },
    fetchPolicy: 'cache-and-network',
  });

  const tracks = useMemo(
    () => data?.tracksV2?.items || [],
    [data?.tracksV2?.items],
  );
  const totalCount = data?.tracksV2?.total || 0;

  // Client-side filtering for search since we want to keep the search bar
  const filteredTracks = useMemo(() => {
    if (!globalFilter.trim()) return tracks;

    const searchTerm = globalFilter.toLowerCase();
    return tracks.filter(
      (track) =>
        track.title.toLowerCase().includes(searchTerm) ||
        track.artist.toLowerCase().includes(searchTerm) ||
        (track.album && track.album.toLowerCase().includes(searchTerm)),
    );
  }, [tracks, globalFilter]);

  const handleFiltersChange = (
    newFilters: FiltersState | ((prevState: FiltersState) => FiltersState),
  ) => {
    setFiltersState(newFilters);
    if (page !== 1) {
      router.push('?page=1');
    }
  };

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setGlobalFilter(searchTerm);
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const debouncedSearch = useDebouncer(handleSearch, { wait: 500 });

  const handleEnrich = useCallback(
    (track: SearchTracksV2Query['tracksV2']['items'][number]) => {
      toast(
        `Enrichment for track ${track.id} - navigate to Enrich Tracks page for full functionality`,
        'gray',
      );
    },
    [],
  );

  const handleEdit = useCallback((trackId: string) => {
    toast(
      `Edit functionality for track ${trackId} not yet implemented`,
      'gray',
    );
  }, []);

  const handleToggleEnabled = useCallback(
    (trackId: string, enabled: boolean) => {
      toast(
        `Toggle enabled for track ${trackId} to ${enabled} not yet implemented`,
        'gray',
      );
    },
    [],
  );

  const { filters, columns, actions, strategy } = useDataTableFilters({
    strategy: 'server',
    data: tracks,
    filters: filtersState,
    onFiltersChange: handleFiltersChange,
    columnsConfig,
    options: {
      // No external options needed for basic track filtering
    },
  });

  const tableColumns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        cell: (props) => (
          <Copyable value={props.getValue()}>
            <Badge color="gray" size="sm">
              #{props.getValue()}
            </Badge>
          </Copyable>
        ),
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => (
          <div className="track-title">
            <div className="track-title__primary">{info.getValue()}</div>
            <div className="track-title__secondary">
              {info.row.original.artist}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('album', {
        header: 'Album',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('duration', {
        header: 'Duration',
        cell: (info) => info.getValue().formatted,
      }),
      columnHelper.accessor('year', {
        header: 'Year',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('genre', {
        header: 'Genre',
        cell: (info) => info.getValue()?.name || '—',
      }),
      columnHelper.accessor('enabled', {
        header: 'Status',
        cell: (info) => (
          <Badge color={info.getValue() ? 'green' : 'gray'}>
            {info.getValue() ? 'Enabled' : 'Disabled'}
          </Badge>
        ),
      }),
      columnHelper.accessor('dateAdded', {
        header: 'Date Added',
        cell: (info) => {
          const date = info.getValue();
          if (!date) return '—';
          return new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="track-actions">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleEnrich(row.original)}
            >
              Enrich
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                handleToggleEnabled(row.original.id, !row.original.enabled)
              }
              className={
                row.original.enabled ? 'button--destructive' : 'button--success'
              }
            >
              {row.original.enabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        ),
      }),
    ],
    [handleEnrich, handleEdit, handleToggleEnabled],
  );

  const table = useReactTable({
    data: filteredTracks,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleRowClick = (
    row: SearchTracksV2Query['tracksV2']['items'][number],
  ) => {
    toast(`View details for "${row.title}" by ${row.artist}`, 'gray');
  };

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching tracks">
          {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        heading="Tracks"
        subheading="Browse and manage your music tracks library"
        actions={
          <Button onClick={() => refetch()} variant="outline">
            Refresh
          </Button>
        }
      />

      <div className="page-content">
        {/* Search Controls */}
        <div className="tracks-filters">
          <div className="tracks-filters__search">
            <Input
              placeholder="Search tracks by title, artist, or album..."
              value={globalFilter}
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setGlobalFilter(value);
                debouncedSearch.maybeExecute(value);
              }}
            />
          </div>
        </div>

        <DataTableFilter
          filters={filters}
          columns={columns}
          actions={actions}
          strategy={strategy}
        />

        <div className="card card--flush">
          {loading ? (
            <div className="data-table__loading">Loading tracks...</div>
          ) : (
            <DataTable
              className="data-table--contained"
              table={table}
              onRowClick={handleRowClick}
            />
          )}
          <Pagination
            className="pagination--contained"
            total={totalCount}
            amount={TRACKS_PER_PAGE}
            currentPage={page}
            onPageChange={handlePageChange}
            entity="Tracks"
          />
        </div>
      </div>
    </div>
  );
}
