'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useParams, usePathname } from 'next/navigation';
import { createContext } from 'react';

import { Network } from '@/graphql/__generated__/graphql';
import { GET_NETWORK, GET_NETWORKS } from '@/graphql/queries/networks';

interface NetworkContextType {
  currentNetwork: Pick<
    Network,
    'id' | 'name' | 'code' | 'logoSvgIcon' | 'networkType'
  > | null;
  isNetworkRoute: boolean;
}

export const NetworkContext = createContext<NetworkContextType | undefined>(
  undefined,
);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();

  const isNetworkRoute = pathname?.startsWith('/networks/');
  const networkCode = isNetworkRoute ? (params.networkCode as string) : null;

  const { data: networksData } = useSuspenseQuery(GET_NETWORKS);

  const { data } = useSuspenseQuery(GET_NETWORK, {
    variables: { id: networkCode ?? '' },
    skip: !networkCode,
  });

  const network = data?.network ?? networksData?.networks?.[0] ?? null;

  return (
    <NetworkContext.Provider
      value={{
        currentNetwork: network,
        isNetworkRoute,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
