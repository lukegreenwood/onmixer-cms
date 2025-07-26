'use client';

import { useLazyQuery, useSuspenseQuery, useMutation } from '@apollo/client';
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Loading,
  Textarea,
  Toggle,
  Dialog,
  Autocomplete,
} from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import { DeleteConfirmationPopover } from '@/blocks/DeleteConfirmationPopover/DeleteConfirmationPopover';
import { MusicBrainzSearchModal } from '@/blocks/MusicBrainzSearchModal';
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
  SearchMusicBrainzQuery,
} from '@/graphql/__generated__/graphql';
import {
  TrackFilterType,
  TextFilterOperator,
  BooleanFilterOperator,
  NumberFilterOperator,
  OperatorType,
  TrackTextFilterField,
  TrackNumberFilterField,
  TrackOptionFilterField,
  TrackMultiOptionFilterField,
  OptionFilterOperator,
  MultiOptionFilterOperator,
} from '@/graphql/__generated__/graphql';
import { DELETE_TRACK } from '@/graphql/mutations/deleteTrack';
import { UPDATE_TRACK } from '@/graphql/mutations/updateTrack';
import { GET_CATEGORIES } from '@/graphql/queries/categories';
import { SEARCH_TRACKS_V2 } from '@/graphql/queries/tracks';
import { TrackIcon, EnrichIcon, EditIcon, DeleteIcon } from '@/icons';
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
          case 'multiOption':
            return {
              type: TrackFilterType.MultiOption,
              multiOptionFilter: {
                field: filter.columnId as TrackMultiOptionFilterField,
                operator: MultiOptionFilterOperator.IncludeAnyOf,
                values: Array.isArray(filter.values)
                  ? filter.values
                  : [filter.values],
              },
            };
          case 'option':
            return {
              type: TrackFilterType.Option,
              optionFilter: {
                field: filter.columnId as TrackOptionFilterField,
                operator: OptionFilterOperator.Is,
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
  columnConfigHelper
    .multiOption()
    .id('subcategory')
    .accessor((row) => row.subcategory?.id)
    .displayName('Category')
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
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [musicBrainzModalOpen, setMusicBrainzModalOpen] = useState(false);
  const [currentTrackForEnrich, setCurrentTrackForEnrich] = useState<
    SearchTracksV2Query['tracksV2']['items'][0] | null
  >(null);

  const offset = (page - 1) * TRACKS_PER_PAGE;

  const createGraphqlFilters = useCallback(
    (searchTerm: string, filters: FiltersState) => {
      const baseFilters = convertFiltersStateToTrackGraphQL(filters, {
        limit: TRACKS_PER_PAGE,
        offset,
      });

      // Add global search filters if search term exists
      if (searchTerm.trim()) {
        const searchTerms = searchTerm
          .split('\n')
          .map((term) => term.trim())
          .filter((term) => term.length > 0);

        const allSearchFilters = [];

        // Create filters for each search term
        for (const trimmedSearchTerm of searchTerms) {
          const termFilters = [];

          // Search by title
          termFilters.push({
            type: TrackFilterType.Text,
            textFilter: {
              field: TrackTextFilterField.Title,
              operator: TextFilterOperator.Contains,
              value: trimmedSearchTerm,
            },
          });

          // Search by artist
          termFilters.push({
            type: TrackFilterType.Text,
            textFilter: {
              field: TrackTextFilterField.Artist,
              operator: TextFilterOperator.Contains,
              value: trimmedSearchTerm,
            },
          });

          // Search by ID if the search term is a number
          if (!isNaN(Number(trimmedSearchTerm))) {
            termFilters.push({
              type: TrackFilterType.Number,
              numberFilter: {
                field: TrackNumberFilterField.Id,
                operator: NumberFilterOperator.Is,
                value: Number(trimmedSearchTerm),
              },
            });
          }

          // Add each term's filters to the main search filters array
          allSearchFilters.push(...termFilters);
        }

        // Create a search filter group with OR operator for all search filters
        const searchFilterGroup = {
          operator: OperatorType.Or,
          filters: allSearchFilters,
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
              filters: [
                ...baseFilters.filterGroup.filters,
                ...allSearchFilters,
              ],
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
    },
    [offset],
  );

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
  const [deleteTrack] = useMutation(DELETE_TRACK);
  const [updateTrack] = useMutation(UPDATE_TRACK);
  const { data: categoriesData } = useSuspenseQuery(GET_CATEGORIES);

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
    const updatedFilters =
      typeof newFilters === 'function' ? newFilters(filtersState) : newFilters;
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
      setCurrentTrackForEnrich(track);
      setMusicBrainzModalOpen(true);
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
    async (trackId: string, enabled: boolean) => {
      try {
        await updateTrack({
          variables: {
            input: {
              id: trackId,
              enabled,
            },
          },
        });
        toast(
          `Track ${enabled ? 'enabled' : 'disabled'} successfully`,
          'success',
        );
        // Refetch tracks to update the table
        const filters = createGraphqlFilters(globalFilter, filtersState);
        fetchTracks({ variables: { filters } });
      } catch {
        toast(`Failed to ${enabled ? 'enable' : 'disable'} track`, 'error');
      }
    },
    [
      updateTrack,
      createGraphqlFilters,
      globalFilter,
      filtersState,
      fetchTracks,
    ],
  );

  const handleDelete = useCallback(
    async (trackId: string) => {
      try {
        await deleteTrack({
          variables: { input: { id: trackId } },
        });
        toast('Track deleted successfully', 'success');
        // Refetch tracks to update the table
        const filters = createGraphqlFilters(globalFilter, filtersState);
        fetchTracks({ variables: { filters } });
        setRowSelection({});
      } catch {
        toast('Failed to delete track', 'error');
      }
    },
    [
      deleteTrack,
      createGraphqlFilters,
      globalFilter,
      filtersState,
      fetchTracks,
    ],
  );

  const handleMusicBrainzSelect = useCallback(
    async (
      recording: SearchMusicBrainzQuery['searchMusicBrainz'][0],
      release: SearchMusicBrainzQuery['searchMusicBrainz'][0]['releases'][0],
    ) => {
      if (!currentTrackForEnrich) return;

      try {
        await updateTrack({
          variables: {
            input: {
              id: currentTrackForEnrich.id,
              title: recording.title,
              artist: recording.artist,
              album: release.album,
              year: release.year?.toString() || null,
              isrc: recording.isrc || null,
              label: release.label || null,
            },
          },
        });
        toast('Track enriched successfully', 'success');
        setMusicBrainzModalOpen(false);
        setCurrentTrackForEnrich(null);
        // Refetch tracks to update the table
        const filters = createGraphqlFilters(globalFilter, filtersState);
        fetchTracks({ variables: { filters } });
      } catch {
        toast('Failed to enrich track', 'error');
      }
    },
    [
      currentTrackForEnrich,
      updateTrack,
      createGraphqlFilters,
      globalFilter,
      filtersState,
      fetchTracks,
    ],
  );

  const handleBulkCategoryChange = useCallback(async () => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length === 0) {
      toast('Please select tracks to update', 'error');
      return;
    }

    if (!selectedCategory) {
      toast('Please select a category', 'error');
      return;
    }

    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateTrack({
            variables: {
              input: {
                id,
                subCategory: parseInt(selectedCategory),
              },
            },
          }),
        ),
      );
      toast(`Updated category for ${selectedIds.length} tracks`, 'success');
      setCategoryModalOpen(false);
      setSelectedCategory('');
      setRowSelection({});
      // Refetch tracks to update the table
      const filters = createGraphqlFilters(globalFilter, filtersState);
      fetchTracks({ variables: { filters } });
    } catch {
      toast('Failed to update track categories', 'error');
    }
  }, [
    rowSelection,
    selectedCategory,
    updateTrack,
    createGraphqlFilters,
    globalFilter,
    filtersState,
    fetchTracks,
  ]);

  const handleBulkAutoEnrich = useCallback(async () => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length === 0) {
      toast('Please select tracks to enrich', 'error');
      return;
    }

    toast(
      `Auto-enrich for ${selectedIds.length} tracks would be implemented here`,
      'info',
    );
  }, [rowSelection]);

  const { filters, columns, actions, strategy } = useDataTableFilters({
    strategy: 'server',
    data: tracks,
    filters: filtersState,
    onFiltersChange: handleFiltersChange,
    columnsConfig,
    options: {
      subcategory:
        categoriesData?.categories?.flatMap((category) =>
          category.subcategories.map((subcategory) => ({
            label: `${subcategory.name} (${category.name})`,
            value: subcategory.id,
          })),
        ) || [],
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
      columnHelper.accessor('subcategory', {
        header: 'Category',
        cell: (info) => {
          const subcategory = info.getValue();
          if (!subcategory) return '—';
          return (
            <div className="track-category">
              <div className="track-category__primary">{subcategory.name}</div>
              <div className="track-category__secondary">
                {subcategory.category.name}
              </div>
            </div>
          );
        },
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
          return format(new Date(date), 'dd/MM/yyyy');
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="track-actions">
            <Button
              variant="outline"
              size="sm"
              isIconOnly
              onClick={() => handleEnrich(row.original)}
              title="Enrich track"
            >
              <EnrichIcon />
            </Button>
            <Button
              variant="outline"
              size="sm"
              isIconOnly
              onClick={() => handleEdit(row.original.id)}
              title="Edit track"
            >
              <EditIcon />
            </Button>
            <Toggle
              size="sm"
              pressed={row.original.enabled}
              onPressedChange={(enabled: boolean) =>
                handleToggleEnabled(row.original.id, enabled)
              }
              title={row.original.enabled ? 'Disable track' : 'Enable track'}
              variant="outline"
            >
              Enabled
            </Toggle>
            <DeleteConfirmationPopover
              entityType="Track"
              entityName={`${row.original.title} by ${row.original.artist}`}
              onConfirm={() => handleDelete(row.original.id)}
              entityNameConfirmation
            >
              <Button
                variant="outline"
                size="sm"
                isIconOnly
                destructive
                title="Delete track"
              >
                <DeleteIcon />
              </Button>
            </DeleteConfirmationPopover>
          </div>
        ),
      }),
    ],
    [handleEnrich, handleEdit, handleToggleEnabled, handleDelete],
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

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div>
      {selectedCount > 0 && (
        <div className="tracks-bulk-actions">
          <div className="tracks-bulk-actions__content">
            <span className="tracks-bulk-actions__count">
              {selectedCount} track{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <div className="tracks-bulk-actions__buttons">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCategoryModalOpen(true)}
              >
                Change Category
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkAutoEnrich}
              >
                Auto Enrich
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRowSelection({})}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
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
            <Textarea
              placeholder="Search tracks by title, artist, or ID... (separate multiple searches with new lines)"
              value={globalFilter}
              onChange={(e) => {
                const value = (e.target as HTMLTextAreaElement).value;
                setGlobalFilter(value);
                debouncedSearch.maybeExecute(value);
              }}
              rows={3}
            />
            {loading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '8px',
                }}
              >
                <Loading size="xxs" />
                <span
                  style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}
                >
                  Searching...
                </span>
              </div>
            )}
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

      <Dialog
        open={categoryModalOpen}
        onOpenChange={(open: boolean) => {
          setCategoryModalOpen(open);
          if (!open) {
            setSelectedCategory('');
          }
        }}
      >
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Change Category</Dialog.Title>
          <Dialog.Description>
            Select a new category for the selected tracks.
          </Dialog.Description>
          <div className="category-modal-content">
            <Autocomplete
              label="Category"
              placeholder="Select a category..."
              value={selectedCategory || undefined}
              onChange={(value) => setSelectedCategory(value || '')}
              options={
                categoriesData?.categories?.flatMap((category) =>
                  category.subcategories.map((subcategory) => ({
                    label: subcategory.name,
                    value: subcategory.id,
                    category: category.name,
                  })),
                ) || []
              }
              renderOption={(option) => {
                const categoryOption = categoriesData?.categories
                  ?.flatMap((category) =>
                    category.subcategories.map((subcategory) => ({
                      label: subcategory.name,
                      value: subcategory.id,
                      category: category.name,
                    })),
                  )
                  .find((s) => s.value === option.value);
                return categoryOption ? (
                  <div className="track-category">
                    <div className="track-category__primary">
                      {categoryOption.label}
                    </div>
                    <div className="track-category__secondary">
                      {categoryOption.category}
                    </div>
                  </div>
                ) : (
                  option.label
                );
              }}
              after={undefined}
              clearable
            />
          </div>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Button
              variant="outline"
              onClick={() => {
                setCategoryModalOpen(false);
                setSelectedCategory('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkCategoryChange}
              disabled={!selectedCategory}
            >
              Update Category
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>

      <MusicBrainzSearchModal
        isOpen={musicBrainzModalOpen}
        onClose={() => {
          setMusicBrainzModalOpen(false);
          setCurrentTrackForEnrich(null);
        }}
        onSelect={handleMusicBrainzSelect}
        initialValues={
          currentTrackForEnrich
            ? {
                artist: currentTrackForEnrich.artist,
                title: currentTrackForEnrich.title,
                album: currentTrackForEnrich.album || undefined,
              }
            : undefined
        }
      />
    </div>
  );
}
