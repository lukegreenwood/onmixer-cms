'use client';

import { useSuspenseQuery } from '@apollo/client';

import { NetworkForm } from '@/components/forms/NetworkForm/NetworkForm';
import { GET_NETWORKS } from '@/graphql/queries/networks';

interface NetworkEditPageProps {
  networkCode: string;
}

export const NetworkEditPage = ({ networkCode }: NetworkEditPageProps) => {
  const { data } = useSuspenseQuery(GET_NETWORKS);
  
  const network = data.networks.find(n => n.code === networkCode);

  if (!network) {
    return <div>Network not found</div>;
  }

  return <NetworkForm network={network} />;
};