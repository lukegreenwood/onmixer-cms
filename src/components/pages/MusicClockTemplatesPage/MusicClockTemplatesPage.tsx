'use client';

import { useQuery, useMutation } from '@apollo/client';
import { Button, Loading } from '@soundwaves/components';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { ActionBar } from '@/components/blocks/ActionBar';
import { Card } from '@/components/blocks/Card/Card';
import { DataTable } from '@/components/blocks/DataTable';
import { PageHeader } from '@/components/blocks/PageHeader';
import {
  AddIcon,
  ClockIcon,
  DeleteIcon,
  EditIcon,
  StarIcon,
  CopyIcon,
} from '@/components/icons';
import {
  DELETE_MUSIC_CLOCK_TEMPLATE,
  SET_DEFAULT_MUSIC_CLOCK_TEMPLATE,
} from '@/graphql/mutations/musicClockTemplates';
import { GET_MUSIC_CLOCK_TEMPLATES } from '@/graphql/queries/musicClockTemplates';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

// import type { ColumnDef } from '@tanstack/react-table';

interface MusicClockTemplate {
  id: string;
  shortId: string;
  name: string;
  description?: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  assignments: Array<{
    id: string;
    dayOfWeek: number;
    hour: number;
    clock: {
      id: string;
      name: string;
      duration: number;
    };
  }>;
}

interface MusicClockTemplatesPageProps {
  networkCode: string;
}

export const MusicClockTemplatesPage = ({
  networkCode,
}: MusicClockTemplatesPageProps) => {
  const router = useRouter();
  const { currentNetwork } = useNetwork();
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  const { data, loading, refetch } = useQuery(GET_MUSIC_CLOCK_TEMPLATES, {
    variables: { networkId: currentNetwork?.id || '' },
    skip: !currentNetwork?.id,
  });

  const [deleteTemplate, { loading: deleteLoading }] = useMutation(
    DELETE_MUSIC_CLOCK_TEMPLATE,
  );
  const [setDefaultTemplate, { loading: setDefaultLoading }] = useMutation(
    SET_DEFAULT_MUSIC_CLOCK_TEMPLATE,
  );

  const templates = useMemo(() => data?.musicClockTemplates || [], [data]);

  const handleCreateTemplate = () => {
    router.push(`/networks/${networkCode}/music-scheduling/templates/create`);
  };

  const handleEditTemplate = (templateId: string) => {
    router.push(
      `/networks/${networkCode}/music-scheduling/templates/${templateId}/edit`,
    );
  };

  const handleViewTemplate = (templateId: string) => {
    router.push(
      `/networks/${networkCode}/music-scheduling/templates/${templateId}`,
    );
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) {
      return;
    }

    try {
      const result = await deleteTemplate({
        variables: { id: templateId },
      });

      if (result.data?.deleteMusicClockTemplate?.success) {
        toast('Template deleted successfully', 'success');
        refetch();
      } else {
        toast(
          result.data?.deleteMusicClockTemplate?.message ||
            'Failed to delete template',
          'error',
        );
      }
    } catch (error) {
      console.error('Delete template error:', error);
      toast('Failed to delete template', 'error');
    }
  };

  const handleSetDefault = async (templateId: string) => {
    if (!currentNetwork?.id) {
      toast('Network not found', 'error');
      return;
    }

    try {
      const result = await setDefaultTemplate({
        variables: {
          networkId: currentNetwork.id,
          templateId,
        },
      });

      if (result.data?.setDefaultMusicClockTemplate?.success) {
        toast('Default template updated successfully', 'success');
        refetch();
      } else {
        toast(
          result.data?.setDefaultMusicClockTemplate?.message ||
            'Failed to set default template',
          'error',
        );
      }
    } catch (error) {
      console.error('Set default template error:', error);
      toast('Failed to set default template', 'error');
    }
  };

  const handleDuplicateTemplate = (templateId: string) => {
    // TODO: Implement template duplication
    console.log('Duplicate template:', templateId);
    toast('Template duplication not yet implemented', 'info');
  };

  const columnHelper = createColumnHelper<MusicClockTemplate>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Template Name',
        cell: ({ row }) => (
          <div className="cell-content cell-content--with-icon">
            <ClockIcon className="cell-icon" />
            <div>
              <div className="cell-title">
                {row.original.name}
                {row.original.isDefault && (
                  <StarIcon
                    className="ml-2 text-yellow-500"
                    size={16}
                    title="Default Template"
                  />
                )}
              </div>
              {row.original.description && (
                <div className="cell-description">
                  {row.original.description}
                </div>
              )}
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('shortId', {
        header: 'ID',
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.original.shortId}</span>
        ),
      }),
      columnHelper.accessor('assignments', {
        header: 'Assignments',
        cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {row.original.assignments.length} slot
            {row.original.assignments.length !== 1 ? 's' : ''}
          </span>
        ),
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Last Modified',
        cell: ({ row }) => (
          <span className="text-sm text-gray-500">
            {new Date(row.original.updatedAt).toLocaleDateString()}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="table-actions">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleViewTemplate(row.original.id)}
              title="View Template"
            >
              View
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleEditTemplate(row.original.id)}
              title="Edit Template"
              isIconOnly
            >
              <EditIcon />
            </Button>
            {!row.original.isDefault && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSetDefault(row.original.id)}
                title="Set as Default"
                disabled={setDefaultLoading}
                isIconOnly
              >
                <StarIcon />
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDuplicateTemplate(row.original.id)}
              title="Duplicate Template"
              isIconOnly
            >
              <CopyIcon />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDeleteTemplate(row.original.id)}
              title="Delete Template"
              disabled={deleteLoading || row.original.isDefault}
              destructive
              isIconOnly
            >
              <DeleteIcon />
            </Button>
          </div>
        ),
      }),
    ],
    [
      handleEditTemplate,
      handleViewTemplate,
      handleDeleteTemplate,
      handleSetDefault,
      handleDuplicateTemplate,
      deleteLoading,
      setDefaultLoading,
    ],
  );

  const table = useReactTable({
    data: templates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="music-clock-templates-page">
      <PageHeader
        heading="Clock Templates"
        subheading="Manage reusable clock templates for broadcast scheduling"
      />

      <div className="page-content">
        <Card>
          <div className="clock-templates-list">
            <div className="clock-templates-list__header">
              <div className="clock-templates-list__title">
                <h2 className="clock-templates-list__heading">Templates</h2>
                <p className="clock-templates-list__description">
                  Create and manage clock templates for your broadcast schedule
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleCreateTemplate}
                before={<AddIcon />}
              >
                Create Template
              </Button>
            </div>

            <DataTable
              table={table}
              onRowClick={(template) => {
                router.push(
                  `/networks/${networkCode}/music-scheduling/templates/${template.id}`,
                );
              }}
            />
          </div>
        </Card>
      </div>

      {selectedTemplates.length > 0 && (
        <ActionBar>
          <span className="text-sm text-gray-600">
            {selectedTemplates.length} template
            {selectedTemplates.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                // TODO: Implement bulk operations
                toast('Bulk operations not yet implemented', 'info');
              }}
            >
              Bulk Actions
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedTemplates([])}
            >
              Clear Selection
            </Button>
          </div>
        </ActionBar>
      )}
    </div>
  );
};
