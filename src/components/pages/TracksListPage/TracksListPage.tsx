'use client';

import { useLazyQuery, useSuspenseQuery } from '@apollo/client';
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Input,
  Loading,
} from '@soundwaves/components';
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
  TrackBooleanFilterField,
} from '@/graphql/__generated__/graphql';
import {
  TrackFilterType,
  TextFilterOperator,
  BooleanFilterOperator,
  NumberFilterOperator,
  OperatorType,
  TrackTextFilterField,
  TrackNumberFilterField,
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
  const [globalFilter, setGlobalFilter] = useState('');
  const [filtersState, setFiltersState] = useState<FiltersState>([]);
  const [hasTriggeredLazyQuery, setHasTriggeredLazyQuery] = useState(false);

  const offset = (page - 1) * TRACKS_PER_PAGE;

  const createGraphqlFilters = useCallback((searchTerm: string, filters: FiltersState) => {
    const baseFilters = convertFiltersStateToTrackGraphQL(filters, {
      limit: TRACKS_PER_PAGE,
      offset,
    });

    // Add global search filters if search term exists
    if (searchTerm.trim()) {
      const trimmedSearchTerm = searchTerm.trim();
      const searchFilters = [];

      // Search by title
      searchFilters.push({
        type: TrackFilterType.Text,
        textFilter: {
          field: TrackTextFilterField.Title,
          operator: TextFilterOperator.Contains,
          value: trimmedSearchTerm,
        },
      });

      // Search by artist
      searchFilters.push({
        type: TrackFilterType.Text,
        textFilter: {
          field: TrackTextFilterField.Artist,
          operator: TextFilterOperator.Contains,
          value: trimmedSearchTerm,
        },
      });

      // Search by ID if the search term is a number
      if (!isNaN(Number(trimmedSearchTerm))) {
        searchFilters.push({
          type: TrackFilterType.Number,
          numberFilter: {
            field: TrackNumberFilterField.Id,
            operator: NumberFilterOperator.Is,
            value: Number(trimmedSearchTerm),
          },
        });
      }

      // Create a search filter group with OR operator
      const searchFilterGroup = {
        operator: OperatorType.Or,
        filters: searchFilters,
      };

      // Combine existing filters with search filters using AND
      if (
        baseFilters.filterGroup?.filters &&
        baseFilters.filterGroup.filters.length > 0
      ) {
        return {
          ...baseFilters,
          filterGroup: {
            operator: OperatorType.And,
            filters: [...baseFilters.filterGroup.filters, ...searchFilters],
          },
        };
      } else {
        return {
          ...baseFilters,
          filterGroup: searchFilterGroup,
        };
      }
    }

    return baseFilters;
  }, [offset]);

  const { data: initialData, error: initialError } = useSuspenseQuery(
    SEARCH_TRACKS_V2,
    {
      variables: {
        filters: convertFiltersStateToTrackGraphQL([], {
          limit: TRACKS_PER_PAGE,
          offset,
        }),
      },
    },
  );
  const [fetchTracks, { data, error, called, loading }] = useLazyQuery(
    SEARCH_TRACKS_V2,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const tracks = useMemo(
    () =>
      called ? data?.tracksV2?.items || [] : initialData?.tracksV2?.items || [],
    [data?.tracksV2?.items, initialData?.tracksV2?.items, called],
  );
  const totalCount = called 
    ? data?.tracksV2?.total || 0 
    : initialData?.tracksV2?.total || 0;

  const handleFiltersChange = (
    newFilters: FiltersState | ((prevState: FiltersState) => FiltersState),
  ) => {
    const updatedFilters = typeof newFilters === 'function' ? newFilters(filtersState) : newFilters;
    setFiltersState(updatedFilters);
    
    // Trigger lazy query on first filter application
    if (!hasTriggeredLazyQuery) {
      setHasTriggeredLazyQuery(true);
    }
    
    // Execute query with updated filters
    const filters = createGraphqlFilters(globalFilter, updatedFilters);
    fetchTracks({ variables: { filters } });
    
    if (page !== 1) {
      router.push('?page=1');
    }
  };

  const handleSearch = useCallback(
    (searchTerm: string) => {
      // Trigger lazy query on first search
      if (!hasTriggeredLazyQuery) {
        setHasTriggeredLazyQuery(true);
      }
      
      // Execute query with search term
      const filters = createGraphqlFilters(searchTerm, filtersState);
      fetchTracks({ variables: { filters } });
    },
    [createGraphqlFilters, filtersState, fetchTracks, hasTriggeredLazyQuery],
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

  const handleEdit = useCallback(
    (trackId: string) => {
      router.push(`/tracks/${trackId}/edit`);
    },
    [router],
  );

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
    data: tracks,
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
    
    // If lazy query has been triggered, refetch with new offset
    if (hasTriggeredLazyQuery) {
      const newOffset = (newPage - 1) * TRACKS_PER_PAGE;
      const filters = createGraphqlFilters(globalFilter, filtersState);
      // Update offset in filters
      const filtersWithNewOffset = {
        ...filters,
        offset: newOffset,
      };
      fetchTracks({ variables: { filters: filtersWithNewOffset } });
    }
  };

  const handleRowClick = (
    row: SearchTracksV2Query['tracksV2']['items'][number],
  ) => {
    router.push(`/tracks/${row.id}/edit`);
  };

  if (error || initialError) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching tracks">
          {error?.message || initialError?.message}
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
          <Button 
            onClick={() => {
              const filters = createGraphqlFilters(globalFilter, filtersState);
              fetchTracks({ variables: { filters } });
            }} 
            variant="outline"
          >
            Refresh
          </Button>
        }
      />

      <div className="page-content">
        <div className="tracks-filters">
          <div className="tracks-filters__search">
            <Input
              placeholder="Search tracks by title, artist, or ID..."
              value={globalFilter}
              onChange={(e) => {
                const value = (e.target as HTMLInputElement).value;
                setGlobalFilter(value);
                debouncedSearch.maybeExecute(value);
              }}
              after={loading ? <Loading size="xxs" /> : null}
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
          <DataTable
            className="data-table--contained"
            table={table}
            onRowClick={handleRowClick}
            excludeRowClickColumns={['select', 'actions']}
          />
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
