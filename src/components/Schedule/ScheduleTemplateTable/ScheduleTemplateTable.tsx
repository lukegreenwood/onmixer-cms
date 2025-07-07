'use client';

import { useMutation, useSuspenseQuery } from '@apollo/client';
import { Badge, Alert } from '@soundwaves/components';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { useState, useCallback, useMemo } from 'react';

import { DataTable, Pagination, Copyable } from '@/components';
import {
  DefaultScheduleFilterField,
  FilterType,
  GetScheduleTemplatesQuery,
} from '@/graphql/__generated__/graphql';
import { DELETE_SCHEDULE_TEMPLATE } from '@/graphql/mutations/deleteScheduleTemplate';
import { DUPLICATE_SCHEDULE_TEMPLATE } from '@/graphql/mutations/duplicateScheduleTemplate';
import { GET_SCHEDULE_TEMPLATES } from '@/graphql/queries/scheduleTemplates';
import { useNavigation, useNetwork } from '@/hooks';
import { toast } from '@/lib';

import { ScheduleTemplateActionsCell } from './ScheduleTemplateActionsCell';

type TemplateRow =
  GetScheduleTemplatesQuery['defaultSchedules']['items'][number];
const columnHelper = createColumnHelper<TemplateRow>();

const TEMPLATES_PER_PAGE = 25;

export const ScheduleTemplateTable = () => {
  const { getNetworkRoutePath, push } = useNavigation();

  const { currentNetwork } = useNetwork();
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * TEMPLATES_PER_PAGE;

  const { data, error, refetch } = useSuspenseQuery(GET_SCHEDULE_TEMPLATES, {
    variables: {
      filters: {
        limit: TEMPLATES_PER_PAGE,
        offset,
        filter: currentNetwork?.id
          ? [
              {
                field: DefaultScheduleFilterField.Networks,
                type: FilterType.Equal,
                value: currentNetwork.id,
              },
            ]
          : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteTemplate] = useMutation(DELETE_SCHEDULE_TEMPLATE);
  const [duplicateTemplate] = useMutation(DUPLICATE_SCHEDULE_TEMPLATE);

  const templates = useMemo(
    () => data?.defaultSchedules?.items || [],
    [data?.defaultSchedules?.items],
  );
  const totalCount = data?.defaultSchedules?.total || 0;

  const handleDelete = useCallback(
    (templateId: string) => {
      deleteTemplate({
        variables: {
          input: { id: templateId },
        },
        onCompleted: () => {
          toast('Schedule template deleted successfully', 'success');
          refetch();
        },
        onError: (error) => {
          toast('Failed to delete schedule template', 'error');
          console.error('Delete template error:', error);
        },
      });
    },
    [deleteTemplate, refetch],
  );

  const handleDeleteConfirm = useCallback(
    (id: string) => {
      console.log('handleDeleteConfirm', id);
      if (id) {
        handleDelete(id);
        refetch();
      }
    },
    [handleDelete, refetch],
  );

  const handleEdit = useCallback(
    (templateId: string) => {
      push(getNetworkRoutePath('templateEdit', [templateId]));
    },
    [push, getNetworkRoutePath],
  );

  const handleDuplicate = useCallback(
    async (template: (typeof templates)[0]) => {
      await duplicateTemplate({
        variables: {
          input: {
            id: template.id,
          },
        },
        onCompleted: () => {
          toast(`Successfully created copy of "${template.name}"`, 'success');
          refetch();
        },
        onError: (error) => {
          toast(`Failed to duplicate "${template.name}"`, 'error');
          console.error('Duplicate template error:', error);
        },
      });
    },
    [duplicateTemplate, refetch],
  );

  const tableColumns = useMemo(
    () => [
      //   columnHelper.display({
      //     id: 'select',
      //     header: ({ table }) => (
      //       <Checkbox
      //         checked={table.getIsAllPageRowsSelected()}
      //         onCheckedChange={(value) =>
      //           table.toggleAllPageRowsSelected(!!value)
      //         }
      //         aria-label="Select all"
      //       />
      //     ),
      //     cell: ({ row }) => (
      //       <Checkbox
      //         checked={row.getIsSelected()}
      //         onCheckedChange={(value) => row.toggleSelected(!!value)}
      //         aria-label="Select row"
      //       />
      //     ),
      //     enableSorting: false,
      //     enableHiding: false,
      //   }),
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (props) => (
          <Copyable value={props.getValue()}>#{props.getValue()}</Copyable>
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
          <ScheduleTemplateActionsCell
            template={row.original}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDeleteConfirm}
          />
        ),
      }),
    ],
    [handleEdit, handleDuplicate, handleDeleteConfirm],
  );

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

  const handleRowClick = (row: TemplateRow) => {
    push(getNetworkRoutePath('templateEdit', [row.id]));
  };

  if (error) {
    return (
      <div className="page-content">
        <Alert
          variant="expanded"
          color="error"
          title="Error fetching schedule templates"
        >
          {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <div className="card card--flush">
      <DataTable
        className="data-table--contained"
        table={table}
        onRowClick={handleRowClick}
      />
      <Pagination
        className="pagination--contained"
        total={totalCount}
        amount={TEMPLATES_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        entity="Schedule Templates"
      />
    </div>
  );
};
