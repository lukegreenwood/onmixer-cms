import { Cell, flexRender, Row, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import { useCallback } from 'react';
export type DataTableProps<TData> = {
  className?: string;
  table: Table<TData>;
  onRowClick?: (row: TData) => void;
  noHover?: boolean;
  excludeRowClickColumns?: string[];
};

export function DataTable<TData>({
  className,
  table,
  onRowClick,
  noHover = false,
  excludeRowClickColumns = [],
}: DataTableProps<TData>) {
  const handleRowClick = useCallback(
    (row: Row<TData>, cell: Cell<TData, unknown>) => {
      if (excludeRowClickColumns?.includes(cell.column.id)) {
        return;
      }
      onRowClick?.(row.original);
    },
    [onRowClick, excludeRowClickColumns],
  );

  return (
    <table
      className={clsx('data-table', className, {
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
            className={
              row.getIsSelected()
                ? 'data-table__row data-table__row--selected'
                : 'data-table__row'
            }
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="data-table__cell"
                onClick={() => handleRowClick(row, cell)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
