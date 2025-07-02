'use client';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { SeriesForm, SeriesFormData, PageHeader } from '@/components';
import { CREATE_SERIES } from '@/graphql/mutations';
import { SEARCH_SERIES } from '@/graphql/queries/series';
import { useNavigation } from '@/hooks';
import { toast } from '@/lib/toast';

export const SeriesCreatePage = () => {
  const { getNetworkRoutePath } = useNavigation();
  const router = useRouter();

  const [createSeries, { loading: isCreating }] = useMutation(CREATE_SERIES);

  const handleFormSubmit = (formData: SeriesFormData) => {
    if (isCreating) return;

    // Transform SeriesFormData to CreateSeriesInput
    const createInput = {
      fullName: formData.fullName,
      shortName: formData.shortName,
      fullDesc: formData.fullDesc,
      shortDesc: formData.shortDesc,
      archived: formData.archived,
      featuredImage: formData.mediaId,
      network: formData.networkId,
      show: formData.show.id,
    };

    createSeries({
      variables: {
        input: createInput,
      },
      onCompleted: (data) => {
        if (data.createSeries.series) {
          toast('Series created successfully', 'success');
          router.push(
            getNetworkRoutePath('seriesEdit', [data.createSeries.series.id]),
          );
        }
      },
      onError: (error) => {
        toast(`Error creating series: ${error.message}`, 'error');
      },
      refetchQueries: [SEARCH_SERIES],
    });
  };

  return (
    <>
      <PageHeader
        heading="Create Series"
        subheading="Create a new series for your show"
        backTo={getNetworkRoutePath('series')}
      />
      <div className="page-content">
        <SeriesForm onSubmit={handleFormSubmit} />
      </div>
    </>
  );
};
