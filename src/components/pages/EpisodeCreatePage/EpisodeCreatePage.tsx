'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { EpisodeForm, EpisodeFormData, PageHeader } from '@/components';
import { CREATE_EPISODE } from '@/graphql/mutations';
import { SEARCH_EPISODES_V2 } from '@/graphql/queries';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export const EpisodeCreatePage = () => {
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();

  const [createEpisode, { loading: isCreating }] = useMutation(CREATE_EPISODE);

  const handleFormSubmit = (formData: EpisodeFormData) => {
    if (isCreating) return;

    // Transform EpisodeFormData to CreateEpisodeInput
    const createInput = {
      name: formData.name,
      description: formData.description,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      extraData: formData.extraData || undefined,
      show: formData.show.id,
      series: formData.series?.id || undefined,
      featuredImage: formData.mediaId,
      networks: formData.networkIds,
      presenters: formData.presenters?.map((p) => p.id) || [],
    };

    createEpisode({
      variables: {
        input: createInput,
      },
      onCompleted: (data) => {
        if (data.createEpisode.episode) {
          toast('Episode created successfully', 'success');
          router.push(
            getNetworkRoutePath('episodesEdit', [
              data.createEpisode.episode.id,
            ]),
          );
        }
      },
      onError: (error) => {
        toast(`Error creating episode: ${error.message}`, 'error');
      },
      refetchQueries: [SEARCH_EPISODES_V2],
    });
  };

  return (
    <>
      <PageHeader
        heading="Create Episode"
        backTo={getNetworkRoutePath('episodes')}
      />
      <div className="page-content">
        <EpisodeForm onSubmit={handleFormSubmit} isEditing={false} />
      </div>
    </>
  );
};
