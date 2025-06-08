import invariant from 'invariant';
import { useRouter } from 'next/navigation';

import { useNetwork } from './useNetwork';

export const useNavigation = () => {
  const router = useRouter();
  const { currentNetwork } = useNetwork();

  const getNetworkRoutePath = (
    path: string,
    networkCode: string = currentNetwork?.code ?? '',
  ) => {
    invariant(networkCode, 'Network code is required');

    return `/networks/${networkCode}/${path}`;
  };

  return { getNetworkRoutePath, ...router };
};
