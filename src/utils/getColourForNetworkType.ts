import { NetworkType } from '@/graphql/__generated__/graphql';

export const getColourForNetworkType = (networkType: NetworkType) => {
  switch (networkType) {
    case NetworkType.Internal:
      return 'gray';
    case NetworkType.Playlist:
      return 'purple';
    case NetworkType.Station:
      return 'green';
    case NetworkType.Stream:
      return 'blue';
    default:
      return 'gray';
  }
};
