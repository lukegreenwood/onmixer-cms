'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useParams, usePathname } from 'next/navigation';
import { createContext } from 'react';

import { Network } from '@/graphql/__generated__/graphql';
import { GET_NETWORKS } from '@/graphql/queries/networks';

interface NetworkContextType {
  currentNetwork: Network | null;
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

  const currentNetwork = networksData?.networks?.find(
    n => n.code === networkCode
  ) ?? null;

  return (
    <NetworkContext.Provider
      value={{
        currentNetwork,
        isNetworkRoute,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
