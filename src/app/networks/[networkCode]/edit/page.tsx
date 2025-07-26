'use client';

import { useSuspenseQuery } from '@apollo/client';

import { NetworkForm } from '@/components/forms/NetworkForm/NetworkForm';
import { GET_NETWORKS } from '@/graphql/queries/networks';

interface NetworkEditPageProps {
  params: { networkCode: string };
}

export default function NetworkEditPage({ params }: NetworkEditPageProps) {
  const { data } = useSuspenseQuery(GET_NETWORKS);
  
  const network = data.networks.find(n => n.code === params.networkCode);

  if (!network) {
    return <div>Network not found</div>;
  }

  return <NetworkForm network={network} />;
}