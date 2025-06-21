'use client';

import type { Column, ColumnDataType } from '../core/types';

interface FilterSubjectProps<TData, TType extends ColumnDataType> {
  column: Column<TData, TType>;
}

export function FilterSubject<TData, TType extends ColumnDataType>({
  column,
}: FilterSubjectProps<TData, TType>) {
  const hasIcon = !!column.icon;
  return (
    <span className="filter-subject">
      {hasIcon && <column.icon className="filter-subject__icon" />}
      <span>{column.displayName}</span>
    </span>
  );
}
