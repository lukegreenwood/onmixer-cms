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
  PresenterForm,
  PresenterFormData,
  PageHeader,
  DeleteIcon,
  DeleteConfirmationPopover,
  DeletePresenterConfirmationModal,
} from '@/components';
import { DELETE_PRESENTER, UPDATE_PRESENTER } from '@/graphql/mutations';
import { GET_PRESENTER } from '@/graphql/queries/presenters';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export interface PresenterEditPageProps {
  id: string;
}

export const PresenterEditPage = ({ id }: PresenterEditPageProps) => {
  const { data } = useSuspenseQuery(GET_PRESENTER, { variables: { id } });
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);

  const [deletePresenter, { loading: isDeleting }] = useMutation(
    DELETE_PRESENTER,
    {
      onCompleted: (data) => {
        if (data.deletePresenter.success) {
          toast('Presenter deleted successfully', 'success');
          router.push(getNetworkRoutePath('presenters'));
        } else {
          toast(
            data.deletePresenter.message || 'Failed to delete presenter',
            'error',
          );
        }
        setShowFinalConfirmation(false);
      },
      onError: (error) => {
        toast(`Error deleting presenter: ${error.message}`, 'error');
        setShowFinalConfirmation(false);
      },
    },
  );

  const [updatePresenter, { loading: isUpdating }] = useMutation(
    UPDATE_PRESENTER,
    {
      onCompleted: (data) => {
        if (data.updatePresenter.presenter) {
          toast('Presenter updated successfully', 'success');
        }
      },
      onError: (error) => {
        toast(`Error updating presenter: ${error.message}`, 'error');
      },
      refetchQueries: [{ query: GET_PRESENTER, variables: { id } }],
    },
  );

  if (!data?.presenter) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Presenter not found">
          Please check the URL and try again.
        </Alert>
      </div>
    );
  }

  const handleFormSubmit = (formData: PresenterFormData) => {
    if (!data?.presenter?.id || isUpdating) return;

    // Transform PresenterFormData to UpdatePresenterInput
    const updateInput = {
      id: data.presenter.id,
      name: formData.name,
      bio: formData.bio,
      shortBio: formData.shortBio,
      hidden: formData.hidden,
      networks: formData.networkIds,
      picture: formData.picture || undefined,
      hero: formData.hero || undefined,
    };

    updatePresenter({
      variables: {
        input: updateInput,
      },
    });
  };

  const handleDeleteConfirm = () => {
    setShowFinalConfirmation(true);
  };

  const handleFinalDeleteConfirm = () => {
    if (!data?.presenter?.id) return;

    deletePresenter({
      variables: {
        input: {
          id: data.presenter.id,
        },
      },
    });
  };

  return (
    <>
      <PageHeader
        heading={data.presenter.name}
        backTo={getNetworkRoutePath('presenters')}
        headingExtras={
          <>
            <Badge color="red" size="sm">
              #{data.presenter.id}
            </Badge>
          </>
        }
        actions={
          <>
            <DeleteConfirmationPopover
              entityName={data.presenter?.name || ''}
              entityType="Presenter"
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
                Delete Presenter
              </Button>
            </DeleteConfirmationPopover>
            <ButtonGroup variant="tertiary" size="sm">
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('presenterEdit', [
                      parseInt(data.presenter.id) - 1,
                    ])}
                  >
                    <ChevronLeftIcon />
                  </Link>
                </Button>
              </ButtonGroup.Item>
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('presenterEdit', [
                      parseInt(data.presenter.id) + 1,
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
        <PresenterForm
          presenterData={data.presenter}
          onSubmit={handleFormSubmit}
        />
      </div>
      <DeletePresenterConfirmationModal
        open={showFinalConfirmation}
        onOpenChange={setShowFinalConfirmation}
        presenterName={data.presenter?.name || ''}
        totalShows={data.presenter?.shows?.total || 0}
        totalEpisodes={data.presenter?.episodes?.total || 0}
        onConfirm={handleFinalDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
};
