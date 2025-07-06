import { Button, Badge } from '@soundwaves/components';
import { Input } from '@soundwaves/components';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

import { Pagination } from '@/blocks/Pagination/Pagination';
import type { SearchTracksQuery, Track } from '@/graphql/__generated__/graphql';

interface TracksTableProps {
  tracks: SearchTracksQuery['tracks']['items'];
  loading?: boolean;
  onEnrich?: (track: Track) => void;
  onEdit?: (trackId: string) => void;
  onToggleEnabled?: (trackId: string, enabled: boolean) => void;
  showBulkActions?: boolean;
  selectedTracks?: string[];
  onSelectTracks?: (trackIds: string[]) => void;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

const columnHelper =
  createColumnHelper<SearchTracksQuery['tracks']['items'][number]>();

export function TracksTable({
  tracks,
  loading = false,
  onEnrich,
  onEdit,
  onToggleEnabled,
  showBulkActions = false,
  selectedTracks = [],
  onSelectTracks,
  totalCount = 0,
  currentPage = 1,
  pageSize = 25,
  onPageChange,
}: TracksTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const formatDuration = (duration: Track['duration']) => {
    return duration.formatted;
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
  };

  const columns = useMemo(
    () => [
      ...(showBulkActions
        ? [
            columnHelper.display({
              id: 'select',
              header: ({ table }) => (
                <input
                  type="checkbox"
                  checked={table.getIsAllRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                />
              ),
              cell: ({ row }) => (
                <input
                  type="checkbox"
                  checked={selectedTracks.includes(row.original.id)}
                  onChange={(e) => {
                    const trackId = row.original.id;
                    if (e.target.checked) {
                      onSelectTracks?.([...selectedTracks, trackId]);
                    } else {
                      onSelectTracks?.(
                        selectedTracks.filter((id) => id !== trackId),
                      );
                    }
                  }}
                />
              ),
            }),
          ]
        : []),
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
        cell: (info) => formatDuration(info.getValue()),
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
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="track-actions">
            {onEnrich && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEnrich(row.original as Track)}
              >
                Enrich
              </Button>
            )}
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(row.original.id)}
              >
                Edit
              </Button>
            )}
            {onToggleEnabled && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  onToggleEnabled(row.original.id, !row.original.enabled)
                }
              >
                {row.original.enabled ? 'Disable' : 'Enable'}
              </Button>
            )}
          </div>
        ),
      }),
    ],
    [
      showBulkActions,
      selectedTracks,
      onSelectTracks,
      onEnrich,
      onEdit,
      onToggleEnabled,
    ],
  );

  const table = useReactTable({
    data: tracks,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
  });

  if (loading) {
    return <div className="data-table__loading">Loading tracks...</div>;
  }

  return (
    <div className="data-table">
      <div className="data-table__header">
        <div className="data-table__search">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setGlobalFilter(target.value);
            }}
          />
        </div>
      </div>

      <div className="data-table__content">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onPageChange && (
        <div className="data-table__footer">
          <Pagination
            currentPage={currentPage}
            amount={pageSize}
            total={totalCount}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
