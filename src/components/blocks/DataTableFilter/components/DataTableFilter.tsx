'use client';

import { useIsMobile } from '../hooks/useMobile';

import { ActiveFilters, ActiveFiltersMobileContainer } from './ActiveFilters';
import { FilterActions } from './FilterActions';
import { FilterSelector } from './FilterSelector';

import type {
  Column,
  DataTableFilterActions,
  FilterStrategy,
  FiltersState,
} from '../core/types';
import type { Locale } from '../lib/i18n';

interface DataTableFilterProps<TData> {
  columns: Column<TData>[];
  filters: FiltersState;
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export function DataTableFilter<TData>({
  columns,
  filters,
  actions,
  strategy,
  locale = 'en',
}: DataTableFilterProps<TData>) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="data-table-filter data-table-filter--mobile">
        <div className="data-table-filter__content">
          <FilterSelector
            columns={columns}
            filters={filters}
            actions={actions}
            strategy={strategy}
            locale={locale}
          />
          <FilterActions
            hasFilters={filters.length > 0}
            actions={actions}
            locale={locale}
          />
        </div>
        <ActiveFiltersMobileContainer>
          <ActiveFilters
            columns={columns}
            filters={filters}
            actions={actions}
            strategy={strategy}
            locale={locale}
          />
        </ActiveFiltersMobileContainer>
      </div>
    );
  }

  return (
    <div className="data-table-filter">
      <div className="data-table-filter__content">
        <FilterSelector
          columns={columns}
          filters={filters}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
        <ActiveFilters
          columns={columns}
          filters={filters}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      </div>
      <FilterActions
        hasFilters={filters.length > 0}
        actions={actions}
        locale={locale}
      />
    </div>
  );
}
