'use client';

import { useMutation, useQuery } from '@apollo/client';
import { DropdownMenu, Button, Tag } from '@soundwaves/components';
import React from 'react';

import { GET_NETWORKS } from '@/graphql';
import { Network } from '@/graphql/__generated__/graphql';
import { UPDATE_SCHEDULE_ITEM } from '@/graphql/mutations/updateScheduleItem';

import { AddIcon } from '../icons';

type NetworksSelectorListProps = {
  id: string;
  networks: Array<
    Pick<Network, 'id' | 'name' | 'logoSvgIcon' | 'logoSvgCircular'> &
      Partial<Omit<Network, 'id' | 'name' | 'logoSvgIcon' | 'logoSvgCircular'>>
  >;
};

export const NetworksSelectorList = ({
  id,
  networks,
}: NetworksSelectorListProps) => {
  const [updateScheduleItem, { loading }] = useMutation(UPDATE_SCHEDULE_ITEM, {
    refetchQueries: ['Schedule'],
  });
  const { data: networksData } = useQuery(GET_NETWORKS);

  const availableNetworks = networksData?.networks.filter(
    (network) => !networks.some((n) => n.id === network.id),
  );

  const handleAddNetwork = (networkId: string) => {
    updateScheduleItem({
      variables: {
        input: {
          id,
          networks: [...networks.map((network) => network.id), networkId],
        },
      },
    });
  };

  const handleRemoveNetwork = (networkId: string) => {
    updateScheduleItem({
      variables: {
        input: {
          id,
          networks: networks
            .filter((network) => network.id !== networkId)
            .map((network) => network.id),
        },
      },
    });
  };

  return (
    <div className="list">
      {networks.map((network) => (
        <Tag
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
          {...(networks.length === 1
            ? { closable: false }
            : {
                closable: true,
                onClose: () => handleRemoveNetwork(network.id),
              })}
        >
          {network.name}
        </Tag>
      ))}
      <DropdownMenu>
        <DropdownMenu.Trigger asChild disabled={loading}>
          <Button isIconOnly size="xs-icon" shape="pill" variant="outline">
            <AddIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content alignOffset={0}>
          <DropdownMenu.Group>
            {availableNetworks?.map((network) => (
              <DropdownMenu.Item
                key={network.id}
                onClick={() => handleAddNetwork(network.id)}
              >
                <div
                  className="network-icon"
                  dangerouslySetInnerHTML={{
                    __html: network.logoSvgCircular ?? network.logoSvgIcon,
                  }}
                />
                {network.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
