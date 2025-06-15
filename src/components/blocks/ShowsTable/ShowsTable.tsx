'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Alert } from '@soundwaves/components';
import { createColumnHelper } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { SearchShowsQuery } from '@/graphql/__generated__/graphql';
import { SEARCH_SHOWS } from '@/graphql/queries';

import { DataTable } from '../DataTable';

const columnHelper =
  createColumnHelper<SearchShowsQuery['shows']['items'][number]>();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
];

export const ShowsTable = () => {
  const { data, error } = useSuspenseQuery(SEARCH_SHOWS);

  console.log(data);

  const table = useReactTable({
    data: data.shows.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <div className="page-content">
        <Alert variant="expanded" color="error" title="Error fetching shows">
          {error.message}
        </Alert>
      </div>
    );
  }

  return <DataTable table={table} />;
};
