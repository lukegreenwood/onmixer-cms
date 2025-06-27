'use client';

import { useSuspenseQuery } from '@apollo/client';
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@soundwaves/components';
import Link from 'next/link';

import { ShowForm, ShowFormData, PageHeader } from '@/components';
import { GET_SHOW } from '@/graphql/queries/shows';
import { useNavigation } from '@/hooks';

export interface ShowEditPageProps {
  id: string;
}

export const ShowEditPage = ({ id }: ShowEditPageProps) => {
  const { data } = useSuspenseQuery(GET_SHOW, { variables: { id } });
  const { getNetworkRoutePath } = useNavigation();

  console.log('show edit page data', data);

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
    console.log('Form submitted:', formData);
    // TODO: Implement form submission logic
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
    </>
  );
};
