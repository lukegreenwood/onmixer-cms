import { useNetwork } from '@/hooks';
import { useSuspenseQuery } from '@apollo/client';
import { GET_NETWORKS } from '@/graphql';
import Link from 'next/link';
import { Badge, Popover } from '@soundwaves/components';
import { NetworkType } from '@/graphql/__generated__/graphql';

const getColourForNetworkType = (networkType: NetworkType) => {
  switch (networkType) {
    case NetworkType.Internal:
      return 'gray';
    case NetworkType.Playlist:
      return 'purple';
    case NetworkType.Station:
      return 'green';
    case NetworkType.Stream:
      return 'blue';
  }
};

export function NetworkSelector() {
  const { currentNetwork } = useNetwork();
  const { data } = useSuspenseQuery(GET_NETWORKS);
  const networks = data?.networks || [];

  return (
    <div className="network-selector">
      <Popover>
        <Popover.Trigger className="network-selector__trigger">
          {currentNetwork?.logoSvgIcon && (
            <div
              className="network-selector__trigger-icon"
              dangerouslySetInnerHTML={{ __html: currentNetwork.logoSvgIcon }}
            />
          )}
          <div className="network-selector__trigger-text-container">
            <span className="network-selector__trigger-text">
              {currentNetwork ? currentNetwork.name : 'Select Network'}
            </span>
            <span className="network-selector__trigger-text-secondary">
              {currentNetwork?.code}
            </span>
          </div>
        </Popover.Trigger>
        <Popover.Content className="network-selector__content">
          {networks.map((network) => (
            <Link
              key={network.id}
              href={`/networks/${network.code}`}
              className="network-selector__item"
            >
              {network.logoSvgIcon && (
                <div
                  className="network-selector__item-icon"
                  dangerouslySetInnerHTML={{ __html: network.logoSvgIcon }}
                />
              )}
              <div className="network-selector__item-text-container">
                <span className="network-selector__item-text">
                  {network.name}
                </span>
                <span className="network-selector__item-text-secondary">
                  {network.code}
                </span>
              </div>
              <Badge
                shape="pill"
                size="sm"
                color={getColourForNetworkType(network.networkType)}
                stroke={network.networkType === NetworkType.Internal}
              >
                {network.networkType}
              </Badge>
            </Link>
          ))}
        </Popover.Content>
      </Popover>
    </div>
  );
}
