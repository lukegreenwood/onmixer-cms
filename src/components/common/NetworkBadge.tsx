'use client';

import { Badge } from '@soundwaves/components';

interface Network {
  id: string;
  name: string;
  logoSvgIcon: string;
}

interface NetworkBadgeProps {
  network: Network;
}

export const NetworkBadge = ({ network }: NetworkBadgeProps) => {
  return (
    <Badge
      key={network.id}
      color="blue"
      size="md"
      before={
        <div
          className="network-icon network-icon--sm"
          dangerouslySetInnerHTML={{
            __html: network.logoSvgIcon,
          }}
        />
      }
    >
      {network.name}
    </Badge>
  );
};