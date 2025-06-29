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
import { useState } from 'react';

import {
  ShowForm,
  ShowFormData,
  PageHeader,
  DeleteIcon,
  DeleteConfirmationPopover,
  DeleteShowConfirmationModal,
} from '@/components';
import { DELETE_SHOW, UPDATE_SHOW } from '@/graphql/mutations';
import { GET_SHOW } from '@/graphql/queries/shows';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export interface ShowEditPageProps {
  id: string;
}

export const ShowEditPage = ({ id }: ShowEditPageProps) => {
  const { data } = useSuspenseQuery(GET_SHOW, { variables: { id } });
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);

  const [deleteShow, { loading: isDeleting }] = useMutation(DELETE_SHOW, {
    onCompleted: (data) => {
      if (data.deleteShow.success) {
        toast('Show deleted successfully', 'success');
        router.push(getNetworkRoutePath('shows'));
      } else {
        toast(data.deleteShow.message || 'Failed to delete show', 'error');
      }
      setShowFinalConfirmation(false);
    },
    onError: (error) => {
      toast(`Error deleting show: ${error.message}`, 'error');
      setShowFinalConfirmation(false);
    },
  });

  const [updateShow, { loading: isUpdating }] = useMutation(UPDATE_SHOW, {
    onCompleted: (data) => {
      if (data.updateShow.show) {
        toast('Show updated successfully', 'success');
      }
    },
    onError: (error) => {
      toast(`Error updating show: ${error.message}`, 'error');
    },
    refetchQueries: [{ query: GET_SHOW, variables: { id } }],
  });

  if (!data?.show) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Show not found">
          Please check the URL and try again.
        </Alert>
      </div>
    );
  }

  const handleFormSubmit = (formData: ShowFormData) => {
    if (!data?.show?.id || isUpdating) return;

    // Transform ShowFormData to UpdateShowInput
    const updateInput = {
      id: data.show.id,
      fullName: formData.name,
      fullDesc: formData.description,
      shortName: formData.shortName,
      shortDesc: formData.shortDescription,
      hidden: !formData.visibleOnSite,
      featuredImage: formData.mediaId,
      networks: formData.networkIds,
      presenters: formData.presenters.map((p) => p.id),
    };

    updateShow({
      variables: {
        input: updateInput,
      },
    });
  };

  const handleDeleteConfirm = () => {
    setShowFinalConfirmation(true);
  };

  const handleFinalDeleteConfirm = () => {
    if (!data?.show?.id) return;

    deleteShow({
      variables: {
        input: {
          id: data.show.id,
        },
      },
    });
  };

  return (
    <>
      <PageHeader
        heading={data.show.fullName}
        backTo={getNetworkRoutePath('shows')}
        headingExtras={
          <>
            <Badge color="red" size="sm">
              #{data.show.id}
            </Badge>
            <Badge color="orange" size="sm">
              {data.show.shortId}
            </Badge>
          </>
        }
        actions={
          <>
            <DeleteConfirmationPopover
              entityName={data.show?.fullName || ''}
              entityType="Show"
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
                Delete Show
              </Button>
            </DeleteConfirmationPopover>
            <ButtonGroup variant="tertiary" size="sm">
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('showEdit', [
                      parseInt(data.show.id) - 1,
                    ])}
                  >
                    <ChevronLeftIcon />
                  </Link>
                </Button>
              </ButtonGroup.Item>
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('showEdit', [
                      parseInt(data.show.id) + 1,
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
        <ShowForm showData={data.show} onSubmit={handleFormSubmit} />
      </div>
      <DeleteShowConfirmationModal
        open={showFinalConfirmation}
        onOpenChange={setShowFinalConfirmation}
        showName={data.show?.fullName || ''}
        totalEpisodes={data.show?.totalEpisodes || 0}
        onConfirm={handleFinalDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
};
