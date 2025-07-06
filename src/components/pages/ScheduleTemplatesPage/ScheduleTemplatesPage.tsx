'use client';

import { useQuery, useMutation } from '@apollo/client';
import { Alert, Badge, Button, Checkbox } from '@soundwaves/components';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { Pagination } from '@/blocks/Pagination/Pagination';
import { Copyable, DataTable } from '@/components';
import { DefaultScheduleFilterField, FilterType, GetScheduleTemplatesQuery } from '@/graphql/__generated__/graphql';
import { CREATE_SCHEDULE_TEMPLATE, DELETE_SCHEDULE_TEMPLATE } from '@/graphql/mutations/scheduleTemplates';
import { GET_SCHEDULE_TEMPLATES } from '@/graphql/queries/scheduleTemplates';
import { useNavigation } from '@/hooks/useNavigation';
import { useNetwork } from '@/hooks/useNetwork';
import { toast } from '@/lib/toast';

interface ScheduleTemplatesPageProps {
  className?: string;
}

const columnHelper = 
  createColumnHelper<GetScheduleTemplatesQuery['defaultSchedules']['items'][number]>();

const TEMPLATES_PER_PAGE = 25;

export function ScheduleTemplatesPage({ className }: ScheduleTemplatesPageProps) {
  const router = useRouter();
  const { getNetworkRoutePath } = useNavigation();
  const { currentNetwork } = useNetwork();
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * TEMPLATES_PER_PAGE;

  const { data, loading, error, refetch } = useQuery(GET_SCHEDULE_TEMPLATES, {
    variables: {
      filters: {
        limit: TEMPLATES_PER_PAGE,
        offset,
        filter: currentNetwork?.id ? [{
          field: DefaultScheduleFilterField.Networks,
          type: FilterType.Equal,
          value: currentNetwork.id,
        }] : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteTemplate] = useMutation(DELETE_SCHEDULE_TEMPLATE);
  const [createTemplate] = useMutation(CREATE_SCHEDULE_TEMPLATE);

  const templates = data?.defaultSchedules?.items || [];
  const totalCount = data?.defaultSchedules?.total || 0;

  const handleDelete = useCallback(async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this schedule template?')) {
      return;
    }

    try {
      await deleteTemplate({
        variables: {
          input: { id: templateId },
        },
      });

      toast('Schedule template deleted successfully', 'success');
      refetch();
    } catch (error) {
      toast('Failed to delete schedule template', 'error');
      console.error('Delete template error:', error);
    }
  }, [deleteTemplate, refetch]);

  const handleEdit = useCallback((templateId: string) => {
    router.push(getNetworkRoutePath('templateEdit', [templateId]));
  }, [router, getNetworkRoutePath]);

  const handleDuplicate = useCallback(async (template: typeof templates[0]) => {
    try {
      await createTemplate({
        variables: {
          input: {
            name: `${template.name} (Copy)`,
            networks: template.networks.map(n => n.id),
          },
        },
      });

      toast(`Successfully created copy of "${template.name}"`, 'success');
      refetch();
    } catch (error) {
      toast(`Failed to duplicate "${template.name}"`, 'error');
      console.error('Duplicate template error:', error);
    }
  }, [createTemplate, refetch]);

  const handleAddTemplate = useCallback(() => {
    // TODO: Add create route when needed
    router.push(getNetworkRoutePath('templates'));
  }, [router, getNetworkRoutePath]);

  const tableColumns = useMemo(() => [
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
      cell: (props) => (
        <Copyable value={props.getValue()}>
          <Badge color="gray" size="sm">
            #{props.getValue()}
          </Badge>
        </Copyable>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('networks', {
      header: 'Networks',
      cell: (props) => (
        <div className="template-networks">
          {props.getValue()?.map((network) => (
            <Badge
              key={network.id}
              color="blue"
              size="sm"
              before={
                <div
                  className="network-icon network-icon--sm"
                  dangerouslySetInnerHTML={{
                    __html: network.logoSvgIcon || '',
                  }}
                />
              }
            >
              {network.name}
            </Badge>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('assignedTo', {
      header: 'Assigned To',
      cell: (props) => {
        const assigned = props.getValue();
        if (!assigned || assigned.length === 0) {
          return <span className="text-muted">Not assigned</span>;
        }
        return (
          <div className="template-assignments">
            {assigned.map((day, index) => (
              <Badge key={index} color="green" size="sm">
                {day}
              </Badge>
            ))}
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="template-actions">
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
            onClick={() => handleDuplicate(row.original)}
          >
            Duplicate
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            className="button--destructive"
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ], [handleEdit, handleDuplicate, handleDelete]);

  const table = useReactTable({
    data: templates,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (
    row: GetScheduleTemplatesQuery['defaultSchedules']['items'][number],
  ) => {
    router.push(getNetworkRoutePath('templateEdit', [row.id]));
  };

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching schedule templates">
          {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <div className={className}>
      <PageHeader
        heading="Schedule Templates"
        subheading="Pre-defined defaults to used to quickly build schedules"
        actions={
          <Button onClick={handleAddTemplate}>
            Add Template
          </Button>
        }
      />
      
      <div className="page-content">
        <div className="card card--flush">
          {loading ? (
            <div className="data-table__loading">Loading schedule templates...</div>
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
            amount={TEMPLATES_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            entity="Schedule Templates"
          />
        </div>
      </div>
    </div>
  );
}