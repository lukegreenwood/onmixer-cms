'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { PresenterForm, PresenterFormData, PageHeader } from '@/components';
import { CREATE_PRESENTER } from '@/graphql/mutations';
import { GET_PRESENTERS } from '@/graphql/queries/presenters';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export const PresenterCreatePage = () => {
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();

  const [createPresenter, { loading: isCreating }] = useMutation(
    CREATE_PRESENTER,
    {
      onCompleted: (data) => {
        if (data.createPresenter.presenter) {
          toast('Presenter created successfully', 'success');
          router.push(
            getNetworkRoutePath('presenterEdit', [
              data.createPresenter.presenter.id,
            ]),
          );
        }
      },
      onError: (error) => {
        toast(`Error creating presenter: ${error.message}`, 'error');
      },
      refetchQueries: [GET_PRESENTERS],
    },
  );

  const handleFormSubmit = (formData: PresenterFormData) => {
    if (isCreating) return;

    // Transform PresenterFormData to CreatePresenterInput
    const createInput = {
      name: formData.name,
      bio: formData.bio,
      shortBio: formData.shortBio,
      hidden: formData.hidden,
      networks: formData.networkIds,
      picture: formData.picture || undefined,
      hero: formData.hero || undefined,
    };

    createPresenter({
      variables: {
        input: createInput,
      },
    });
  };

  return (
    <>
      <PageHeader
        heading="Create Presenter"
        subheading="Create a new presenter for your network"
        backTo={getNetworkRoutePath('presenters')}
      />
      <div className="page-content">
        <PresenterForm onSubmit={handleFormSubmit} />
      </div>
    </>
  );
};
