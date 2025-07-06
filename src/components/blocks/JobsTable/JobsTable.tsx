import { useMutation } from '@apollo/client';
import {
  Button,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@soundwaves/components';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import React, { useMemo, useState, useCallback } from 'react';

import { DataTable } from '@/blocks/DataTable';
import { DataTableFilter, useDataTableFilters } from '@/blocks/DataTableFilter';
import { createColumnConfigHelper } from '@/blocks/DataTableFilter/core/filters';
import { JobDetailsModal } from '@/blocks/JobDetailsModal';
import { MusicBrainzSearchModal } from '@/blocks/MusicBrainzSearchModal';
import { Pagination } from '@/blocks/Pagination';
import { Job, JobStatus, MusicBrainzSearchResult } from '@/graphql/__generated__/graphql';
import { CREATE_ENRICHMENT_JOB, RETRY_JOB } from '@/graphql/mutations/enrichmentJobs';

interface JobsTableProps {
  jobs: Job[];
  loading?: boolean;
  onCancel?: (jobId: string) => void;
  onEnrich?: (jobId: string) => void;
  onRetry?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
  statusFilter?: JobStatus | 'ALL';
  onStatusFilterChange?: (status: JobStatus | 'ALL') => void;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const columnHelper = createColumnHelper<Job>();
const columnConfigHelper = createColumnConfigHelper<Job>();
const EmptyIcon = () => <React.Fragment />;

export function JobsTable({
  jobs,
  loading = false,
  onCancel,
  onEnrich,
  onRetry,
  onViewDetails,
  statusFilter = 'ALL',
  onStatusFilterChange,
  totalCount = 0,
  currentPage = 1,
  pageSize = 25,
  onPageChange,
}: JobsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  
  // Modal states
  const [jobDetailsModal, setJobDetailsModal] = useState<{
    isOpen: boolean;
    jobId: string | null;
  }>({ isOpen: false, jobId: null });
  
  const [musicBrainzModal, setMusicBrainzModal] = useState<{
    isOpen: boolean;
    jobId: string | null;
    songId: string | null;
  }>({ isOpen: false, jobId: null, songId: null });

  // Mutations
  const [createEnrichmentJob] = useMutation(CREATE_ENRICHMENT_JOB);
  const [retryJob] = useMutation(RETRY_JOB);

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.Completed:
        return 'green';
      case JobStatus.Failed:
        return 'red';
      case JobStatus.Processing:
        return 'blue';
      case JobStatus.PendingEnrichment:
        return 'orange';
      case JobStatus.Cancelled:
        return 'gray';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewDetails = useCallback((jobId: string) => {
    if (onViewDetails) {
      onViewDetails(jobId);
    } else {
      setJobDetailsModal({ isOpen: true, jobId });
    }
  }, [onViewDetails]);

  const handleRetry = useCallback(async (jobId: string) => {
    try {
      await retryJob({ variables: { id: jobId } });
      // Optionally refresh the job list or show success message
      if (onRetry) {
        onRetry(jobId);
      }
    } catch (error) {
      console.error('Failed to retry job:', error);
    }
  }, [retryJob, onRetry]);

  const handleEnrich = useCallback((job: Job) => {
    if (onEnrich) {
      onEnrich(job.id);
    } else {
      // Open MusicBrainz search modal
      setMusicBrainzModal({ 
        isOpen: true, 
        jobId: job.id, 
        songId: job.songId ? job.songId.toString() : null 
      });
    }
  }, [onEnrich]);

  const handleMusicBrainzSelect = useCallback(async (result: MusicBrainzSearchResult) => {
    if (!musicBrainzModal.songId) {
      console.error('No song ID available for enrichment');
      return;
    }

    try {
      await createEnrichmentJob({
        variables: {
          input: {
            songId: parseInt(musicBrainzModal.songId),
            musicbrainzReleaseId: result.id,
          },
        },
      });

      setMusicBrainzModal({ isOpen: false, jobId: null, songId: null });
      // Optionally refresh the job list or show success message
    } catch (error) {
      console.error('Failed to create enrichment job:', error);
    }
  }, [musicBrainzModal.songId, createEnrichmentJob]);

  const getActionButtons = useCallback((job: Job) => {
    const buttons = [];

    if (
      job.status === JobStatus.Pending ||
      job.status === JobStatus.Processing
    ) {
      buttons.push(
        <Button
          key="cancel"
          variant="secondary"
          size="sm"
          destructive
          onClick={() => onCancel?.(job.id)}
        >
          Cancel
        </Button>,
      );
    }

    if (job.status === JobStatus.PendingEnrichment) {
      buttons.push(
        <Button
          key="enrich"
          variant="secondary"
          size="sm"
          onClick={() => handleEnrich(job)}
        >
          Enrich
        </Button>,
      );
    }

    if (job.status === JobStatus.Failed) {
      buttons.push(
        <Button
          key="retry"
          variant="secondary"
          size="sm"
          onClick={() => handleRetry(job.id)}
        >
          Retry
        </Button>,
      );
    }

    buttons.push(
      <Button
        key="details"
        variant="secondary"
        size="sm"
        onClick={() => handleViewDetails(job.id)}
      >
        Details
      </Button>,
    );

    return buttons;
  }, [onCancel, handleEnrich, handleRetry, handleViewDetails]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => (
          <span className="job__id" title={info.getValue()}>
            {info.getValue().slice(0, 8)}...
          </span>
        ),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => (
          <Badge color="gray" shape="rounded">
            {info.getValue()}
          </Badge>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <div className="job__status">
            <Badge color={getStatusColor(info.getValue())} shape="rounded">
              {info.getValue().replace('_', ' ')}
            </Badge>
          </div>
        ),
      }),
      columnHelper.accessor('sourceUrl', {
        header: 'Source',
        cell: (info) => {
          const url = info.getValue();
          if (!url) return info.row.original.searchQuery || '—';

          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="job__source-link"
              title={url}
            >
              {url.length > 50 ? `${url.slice(0, 50)}...` : url}
            </a>
          );
        },
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: (info) => formatDate(info.getValue()),
        sortingFn: 'datetime',
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Updated',
        cell: (info) => formatDate(info.getValue()),
        sortingFn: 'datetime',
      }),
      columnHelper.accessor('errorMessage', {
        header: 'Error',
        cell: (info) => {
          const error = info.getValue();
          if (!error) return '—';

          return (
            <span className="job__error" title={error}>
              {error.length > 30 ? `${error.slice(0, 30)}...` : error}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="job__actions">{getActionButtons(row.original)}</div>
        ),
      }),
    ],
    [getActionButtons],
  );

  const columnsConfig = [
    columnConfigHelper
      .text()
      .id('id')
      .accessor((row) => row.id)
      .displayName('ID')
      .icon(EmptyIcon)
      .build(),
    columnConfigHelper
      .text()
      .id('type')
      .accessor((row) => row.type)
      .displayName('Type')
      .icon(EmptyIcon)
      .build(),
    columnConfigHelper
      .text()
      .id('status')
      .accessor((row) => row.status)
      .displayName('Status')
      .icon(EmptyIcon)
      .build(),
  ];

  const {
    filters,
    columns: filterColumns,
    actions,
    strategy,
  } = useDataTableFilters({
    strategy: 'client',
    data: jobs,
    filters: [],
    onFiltersChange: () => {},
    columnsConfig,
  });

  const table = useReactTable({
    data: jobs,
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

  return (
    <div className="jobs-table__container">
      <div className="jobs-table__filters">
        <DataTableFilter
          columns={filterColumns}
          filters={filters}
          actions={actions}
          strategy={strategy}
        />
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            onStatusFilterChange?.(value as JobStatus | 'ALL')
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {Object.values(JobStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="jobs-table__loading">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="jobs-table__empty">No jobs found</div>
      ) : (
        <>
          <DataTable table={table} />
          <Pagination
            currentPage={currentPage}
            amount={pageSize}
            total={totalCount}
            entity="jobs"
            onPageChange={onPageChange}
          />
        </>
      )}

      <JobDetailsModal
        isOpen={jobDetailsModal.isOpen}
        onClose={() => setJobDetailsModal({ isOpen: false, jobId: null })}
        jobId={jobDetailsModal.jobId}
      />

      <MusicBrainzSearchModal
        isOpen={musicBrainzModal.isOpen}
        onClose={() => setMusicBrainzModal({ isOpen: false, jobId: null, songId: null })}
        onSelect={handleMusicBrainzSelect}
      />
    </div>
  );
}
