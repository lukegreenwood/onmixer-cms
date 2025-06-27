import invariant from 'invariant';
import { useRouter } from 'next/navigation';

import { getRoutePath, RouteName } from '@/lib';

import { useNetwork } from './useNetwork';

export const useNavigation = () => {
  const router = useRouter();
  const { currentNetwork } = useNetwork();

  const getNetworkRoutePath = (
    path: RouteName,
    replacements: Array<string | number> = [],
    networkCode: string = currentNetwork?.code ?? '',
  ) => {
    invariant(networkCode, 'Network code is required');

    return `/networks/${networkCode}${getRoutePath(path, replacements)}`;
  };

  return { getNetworkRoutePath, ...router };
};
