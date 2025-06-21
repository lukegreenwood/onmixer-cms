'use client';

import { Button, CloseIcon, Separator } from '@soundwaves/components';
import { useEffect, useRef, useState } from 'react';

import { getColumn } from '../lib/helpers';

import { FilterOperator } from './FilterOperator';
import { FilterSubject } from './FilterSubject';
import { FilterValue } from './FilterValue';

import type {
  Column,
  ColumnDataType,
  DataTableFilterActions,
  FilterModel,
  FilterStrategy,
  FiltersState,
} from '../core/types';
import type { Locale } from '../lib/i18n';

interface ActiveFiltersProps<TData> {
  columns: Column<TData>[];
  filters: FiltersState;
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export function ActiveFilters<TData>({
  columns,
  filters,
  actions,
  strategy,
  locale = 'en',
}: ActiveFiltersProps<TData>) {
  return (
    <>
      {filters.map((filter) => {
        const id = filter.columnId;

        const column = getColumn(columns, id);

        // Skip if no filter value
        if (!filter.values) return null;

        return (
          <ActiveFilter
            key={`active-filter-${filter.columnId}`}
            filter={filter}
            column={column}
            actions={actions}
            strategy={strategy}
            locale={locale}
          />
        );
      })}
    </>
  );
}

interface ActiveFilterProps<TData, TType extends ColumnDataType> {
  filter: FilterModel<TType>;
  column: Column<TData, TType>;
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

// Generic render function for a filter with type-safe value
export function ActiveFilter<TData, TType extends ColumnDataType>({
  filter,
  column,
  actions,
  strategy,
  locale = 'en',
}: ActiveFilterProps<TData, TType>) {
  return (
    <div className="active-filter">
      <FilterSubject column={column} />
      <Separator orientation="vertical" />
      <FilterOperator
        filter={filter}
        column={column}
        actions={actions}
        locale={locale}
      />
      <Separator orientation="vertical" />
      <FilterValue
        filter={filter}
        column={column}
        actions={actions}
        strategy={strategy}
        locale={locale}
      />
      <Separator orientation="vertical" />
      <Button
        variant="transparent"
        size="sm"
        onClick={() => actions.removeFilter(filter.columnId)}
        isIconOnly
        className="active-filter__close-button"
      >
        <CloseIcon className="active-filter__close-button-icon" />
      </Button>
    </div>
  );
}

export function ActiveFiltersMobileContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);

  // Check if there's content to scroll and update blur states
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Show left blur if scrolled to the right
      setShowLeftBlur(scrollLeft > 0);

      // Show right blur if there's more content to scroll to the right
      // Add a small buffer (1px) to account for rounding errors
      setShowRightBlur(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Log blur states for debugging
  // useEffect(() => {
  //   console.log('left:', showLeftBlur, '  right:', showRightBlur)
  // }, [showLeftBlur, showRightBlur])

  // Set up ResizeObserver to monitor container size
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (scrollContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(scrollContainerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Update blur states when children change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkScroll();
  }, [children]);

  return (
    <div className="active-filters-mobile">
      {/* Left blur effect */}
      {showLeftBlur && (
        <div className="active-filters-mobile__blur active-filters-mobile__blur--left" />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="active-filters-mobile__container"
        onScroll={checkScroll}
      >
        {children}
      </div>

      {/* Right blur effect */}
      {showRightBlur && (
        <div className="active-filters-mobile__blur active-filters-mobile__blur--right" />
      )}
    </div>
  );
}
