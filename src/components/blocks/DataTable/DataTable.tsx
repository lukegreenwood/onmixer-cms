import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
export type DataTableProps<TData> = {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  onRowClick?: (row: TData) => void;
  selectedRows?: RowSelectionState | undefined;
  noHover?: boolean;
};

export function DataTable<TData>({
  data,
  columns,
  onRowClick,
  selectedRows = {},
  noHover = false,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedRows,
    },
  });

  return (
    <table
      className={clsx('data-table', {
        'data-table--no-hover': noHover,
      })}
    >
      <thead className="data-table__header">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="data-table__cell data-table__header-cell"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            className={
              row.getIsSelected()
                ? 'data-table__row data-table__row--selected'
                : 'data-table__row'
            }
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="data-table__cell">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
