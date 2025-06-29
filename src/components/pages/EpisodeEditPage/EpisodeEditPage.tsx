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
  EpisodeForm,
  EpisodeFormData,
  PageHeader,
  DeleteIcon,
  DeleteConfirmationPopover,
} from '@/components';
import { DELETE_EPISODE, UPDATE_EPISODE } from '@/graphql/mutations';
import { GET_EPISODE } from '@/graphql/queries';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export interface EpisodeEditPageProps {
  id: string;
}

export const EpisodeEditPage = ({ id }: EpisodeEditPageProps) => {
  const { data } = useSuspenseQuery(GET_EPISODE, { variables: { id } });
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();

  const [deleteEpisode, { loading: isDeleting }] = useMutation(DELETE_EPISODE, {
    onCompleted: (data) => {
      if (data.deleteEpisode.success) {
        toast('Episode deleted successfully', 'success');
        router.push(getNetworkRoutePath('episodes'));
      } else {
        toast(
          data.deleteEpisode.message || 'Failed to delete episode',
          'error',
        );
      }
    },
    onError: (error) => {
      toast(`Error deleting episode: ${error.message}`, 'error');
    },
  });

  const [updateEpisode, { loading: isUpdating }] = useMutation(UPDATE_EPISODE, {
    onCompleted: (data) => {
      if (data.updateEpisode.episode) {
        toast('Episode updated successfully', 'success');
      }
    },
    onError: (error) => {
      toast(`Error updating episode: ${error.message}`, 'error');
    },
    refetchQueries: [{ query: GET_EPISODE, variables: { id } }],
  });

  if (!data?.episode) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Episode not found">
          Please check the URL and try again.
        </Alert>
      </div>
    );
  }

  const handleFormSubmit = (formData: EpisodeFormData) => {
    if (!data?.episode?.id || isUpdating) return;

    // Transform EpisodeFormData to UpdateEpisodeInput
    const updateInput = {
      id: data.episode.id,
      name: formData.name,
      description: formData.description,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      extraData: formData.extraData || undefined,
      show: formData.show.id,
      series: formData.series?.id || undefined,
      featuredImage: formData.mediaId,
      networks: formData.networkIds,
      presenters: formData.presenters.map((p) => p.id),
    };

    updateEpisode({
      variables: {
        input: updateInput,
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (!data?.episode?.id) return;

    deleteEpisode({
      variables: {
        input: {
          id: data.episode.id,
        },
      },
    });
  };

  return (
    <>
      <PageHeader
        heading={data.episode.name}
        backTo={getNetworkRoutePath('episodes')}
        headingExtras={
          <>
            <Badge color="red" size="sm">
              #{data.episode.id}
            </Badge>
            <Badge color="orange" size="sm">
              {data.episode.shortId}
            </Badge>
          </>
        }
        actions={
          <>
            <DeleteConfirmationPopover
              entityName={data.episode?.name || ''}
              entityType="Episode"
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
                Delete Episode
              </Button>
            </DeleteConfirmationPopover>
            <ButtonGroup variant="tertiary" size="sm">
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('episodesEdit', [
                      parseInt(data.episode.id) - 1,
                    ])}
                  >
                    <ChevronLeftIcon />
                  </Link>
                </Button>
              </ButtonGroup.Item>
              <ButtonGroup.Item isIconOnly asChild>
                <Button asChild>
                  <Link
                    href={getNetworkRoutePath('episodesEdit', [
                      parseInt(data.episode.id) + 1,
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
        <EpisodeForm episodeData={data.episode} onSubmit={handleFormSubmit} />
      </div>
    </>
  );
};
