'use client';

import { useSuspenseQuery } from '@apollo/client';

import { NetworkForm } from '@/components/forms/NetworkForm/NetworkForm';
import {
  GetNetworkQuery,
  GetNetworkQueryVariables,
} from '@/graphql/__generated__/graphql';
import { GET_NETWORK } from '@/graphql/queries/networks';

interface NetworkEditPageProps {
  networkCode: string;
}

export const NetworkEditPage = ({ networkCode }: NetworkEditPageProps) => {
  const { data } = useSuspenseQuery<GetNetworkQuery, GetNetworkQueryVariables>(
    GET_NETWORK,
    {
      variables: {
        id: networkCode,
      },
    },
  );

  if (!data.network) {
    return <div>Network not found</div>;
  }

  return <NetworkForm network={data.network} />;
};
