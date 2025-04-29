'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Avatar, Badge, Button } from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';

import { DataTable, PageHeader } from '@/components/blocks';
import { LinkIcon } from '@/components/icons';
import { GET_NETWORKS } from '@/graphql';
import { GetNetworksQuery } from '@/graphql/__generated__/graphql';
import { getColourForNetworkType } from '@/utils';

const columnHelper = createColumnHelper<GetNetworksQuery['networks'][number]>();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.display({
    id: 'image',
    cell: (props) => {
      const data = props.row.original;
      return (
        <Avatar size="sm">
          <Avatar.Fallback
            style={{ backgroundColor: 'transparent' }}
            dangerouslySetInnerHTML={{
              __html: data.logoSvgIcon,
            }}
          />
        </Avatar>
      );
    },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('code', {
    header: 'Code',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('baseUrl', {
    header: 'URL Prefix',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('networkType', {
    header: 'Type',
    cell: (props) => (
      <Badge
        shape="pill"
        size="sm"
        color={getColourForNetworkType(props.getValue())}
      >
        {props.getValue()}
      </Badge>
    ),
  }),
  columnHelper.display({
    header: 'Link',
    id: 'link',
    cell: (props) => {
      const data = props.row.original;

      return (
        <Button asChild size="xs-icon" isIconOnly variant="outline">
          <a
            href={`https://onmixer.dev.gigantic.engineering/networks${data.baseUrl}`}
          >
            <LinkIcon />
          </a>
        </Button>
      );
    },
  }),
];

export const NetworksPage = () => {
  const { data } = useSuspenseQuery(GET_NETWORKS);

  return (
    <>
      <PageHeader
        heading="Networks"
        subheading="The root of the relationship, networks allow you to seperate content into distinct brands."
        actions={
          <Button variant="primary" asChild>
            <Link href="/networks/create">Create Network</Link>
          </Button>
        }
      />
      <div className="page-content">
        <DataTable data={data.networks} columns={columns} />
      </div>
    </>
  );
};
