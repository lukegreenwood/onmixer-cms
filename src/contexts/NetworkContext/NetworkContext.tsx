'use client';

import { createContext } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client';
import { GET_NETWORK } from '@/graphql/queries/networks';
import { Network } from '@/graphql/__generated__/graphql';

interface NetworkContextType {
  currentNetwork: Pick<Network, 'id' | 'name' | 'code'> | null;
  isNetworkRoute: boolean;
}

export const NetworkContext = createContext<NetworkContextType | undefined>(
  undefined,
);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();

  // Check if current route is a network route
  const isNetworkRoute = pathname?.startsWith('/networks/');
  const networkCode = isNetworkRoute ? (params.networkCode as string) : null;

  // Fetch network details if we have a network ID
  const { data } = useSuspenseQuery(GET_NETWORK, {
    variables: { id: networkCode ?? '' },
    skip: !networkCode,
  });

  return (
    <NetworkContext.Provider
      value={{
        currentNetwork: data?.network ?? null,
        isNetworkRoute,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
