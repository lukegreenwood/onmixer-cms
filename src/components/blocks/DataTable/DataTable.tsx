import { flexRender, Table } from '@tanstack/react-table';
import clsx from 'clsx';
export type DataTableProps<TData> = {
  className?: string;
  table: Table<TData>;
  onRowClick?: (row: TData) => void;
  noHover?: boolean;
};

export function DataTable<TData>({
  className,
  table,
  onRowClick,
  noHover = false,
}: DataTableProps<TData>) {
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
