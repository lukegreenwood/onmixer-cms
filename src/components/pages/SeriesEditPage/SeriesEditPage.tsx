'use client';

import { useMutation, useSuspenseQuery } from '@apollo/client';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@soundwaves/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  SeriesForm,
  SeriesFormData,
  PageHeader,
  DeleteIcon,
  DeleteConfirmationPopover,
} from '@/components';
import { DELETE_SERIES, UPDATE_SERIES } from '@/graphql/mutations';
import { GET_SERIES } from '@/graphql/queries/series';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export interface SeriesEditPageProps {
  id: string;
}

export const SeriesEditPage = ({ id }: SeriesEditPageProps) => {
  const { data } = useSuspenseQuery(GET_SERIES, { variables: { id } });
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();

  const [deleteSeries, { loading: isDeleting }] = useMutation(DELETE_SERIES, {
    onCompleted: (data) => {
      if (data.deleteSeries.success) {
        toast('Series deleted successfully', 'success');
        router.push(getNetworkRoutePath('series'));
      } else {
        toast(data.deleteSeries.message || 'Failed to delete series', 'error');
      }
    },
    onError: (error) => {
      toast(`Error deleting series: ${error.message}`, 'error');
    },
  });

  const [updateSeries, { loading: isUpdating }] = useMutation(UPDATE_SERIES, {
    onCompleted: (data) => {
      if (data.updateSeries.series) {
        toast('Series updated successfully', 'success');
      }
    },
    onError: (error) => {
      toast(`Error updating series: ${error.message}`, 'error');
    },
    refetchQueries: [{ query: GET_SERIES, variables: { id } }],
  });

  if (!data?.series) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Series not found">
          Please check the URL and try again.
        </Alert>
      </div>
    );
  }

  const handleFormSubmit = (formData: SeriesFormData) => {
    if (!data?.series?.id || isUpdating) return;

    // Transform SeriesFormData to UpdateSeriesInput
    const updateInput = {
      id: data.series.id,
      fullName: formData.fullName,
      shortName: formData.shortName,
      fullDesc: formData.fullDesc,
      shortDesc: formData.shortDesc,
      archived: formData.archived,
      featuredImage: formData.mediaId,
      show: formData.show.id,
      network: formData.networkId,
    };

    updateSeries({
      variables: {
        input: updateInput,
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (!data?.series?.id) return;

    deleteSeries({
      variables: {
        input: {
          id: data.series.id,
        },
      },
    });
  };

  return (
    <>
      <PageHeader
        heading={data.series.fullName}
        backTo={getNetworkRoutePath('series')}
        headingExtras={
          <>
            <Badge color="red" size="sm">
              #{data.series.id}
            </Badge>
            {data.series.archived && (
              <Badge color="gray" size="sm">
                Archived
              </Badge>
            )}
          </>
        }
        actions={
          <>
            <DeleteConfirmationPopover
              entityName={data.series?.fullName || ''}
              entityType="Series"
              onConfirm={handleDeleteConfirm}
              disabled={isDeleting || isUpdating}
            >
              <Button
                variant="tertiary"
                size="sm"
                before={<DeleteIcon />}
                destructive
                disabled={isDeleting || isUpdating}
              >
                Delete Series
              </Button>
            </DeleteConfirmationPopover>
            <ButtonGroup variant="tertiary" size="sm">
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('seriesEdit', [
                      parseInt(data.series.id) - 1,
                    ])}
                  >
                    <ChevronLeftIcon />
                  </Link>
                </Button>
              </ButtonGroup.Item>
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('seriesEdit', [
                      parseInt(data.series.id) + 1,
                    ])}
                  >
                    <ChevronRightIcon />
                  </Link>
                </Button>
              </ButtonGroup.Item>
            </ButtonGroup>
          </>
        }
      />
      <div className="page-content">
        <SeriesForm seriesData={data.series} onSubmit={handleFormSubmit} />
      </div>
    </>
  );
};
