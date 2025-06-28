'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { ShowForm, ShowFormData, PageHeader } from '@/components';
import { CREATE_SHOW } from '@/graphql/mutations';
import { SEARCH_SHOWS } from '@/graphql/queries/shows';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export const ShowCreatePage = () => {
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();

  const [createShow, { loading: isCreating }] = useMutation(CREATE_SHOW, {
    onCompleted: (data) => {
      if (data.createShow.show) {
        toast('Show created successfully', 'success');
        router.push(getNetworkRoutePath('showEdit', [data.createShow.show.id]));
      }
    },
    onError: (error) => {
      toast(`Error creating show: ${error.message}`, 'error');
    },
    refetchQueries: [SEARCH_SHOWS],
  });

  const handleFormSubmit = (formData: ShowFormData) => {
    if (isCreating) return;

    // Transform ShowFormData to CreateShowInput
    const createInput = {
      fullName: formData.name,
      fullDesc: formData.description,
      shortName: formData.shortName,
      shortDesc: formData.shortDescription,
      hidden: !formData.visibleOnSite,
      featuredImage: formData.mediaId,
      networks: formData.networkIds,
      presenters: formData.presenters.map((p) => p.id),
    };

    createShow({
      variables: {
        input: createInput,
      },
    });
  };

  return (
    <>
      <PageHeader
        heading="Create Show"
        subheading="Create a new show for your network"
        backTo={getNetworkRoutePath('shows')}
      />
      <div className="page-content">
        <ShowForm onSubmit={handleFormSubmit} />
      </div>
    </>
  );
};
