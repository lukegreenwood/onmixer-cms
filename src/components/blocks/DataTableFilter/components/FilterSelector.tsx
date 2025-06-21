'use client';

import {
  Button,
  Checkbox,
  ChevronRightIcon,
  Popover,
} from '@soundwaves/components';
import clsx from 'clsx';
import {
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import React from 'react';

import { FilterAddIcon } from '@/components';

import { isAnyOf } from '../lib/array';
import { getColumn } from '../lib/helpers';
import { type Locale, t } from '../lib/i18n';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

import { FilterValueController } from './FilterValue';

import type {
  Column,
  ColumnDataType,
  DataTableFilterActions,
  FilterStrategy,
  FiltersState,
} from '../core/types';

interface FilterSelectorProps<TData> {
  filters: FiltersState;
  columns: Column<TData>[];
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export const FilterSelector = memo(
  FilterSelectorInternal,
) as typeof FilterSelectorInternal;

function FilterSelectorInternal<TData>({
  filters,
  columns,
  actions,
  strategy,
  locale = 'en',
}: FilterSelectorProps<TData>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [property, setProperty] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const column = property ? getColumn(columns, property) : undefined;
  const filter = property
    ? filters.find((f) => f.columnId === property)
    : undefined;

  const hasFilters = filters.length > 0;

  useEffect(() => {
    if (property && inputRef) {
      inputRef.current?.focus();
      setValue('');
    }
  }, [property]);

  useEffect(() => {
    if (!open) setTimeout(() => setValue(''), 150);
  }, [open]);

  const content = useMemo(
    () =>
      property && column ? (
        <FilterValueController
          filter={filter!}
          column={column as Column<TData, ColumnDataType>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      ) : (
        <Command
          loop
          filter={(value, search, keywords) => {
            const extendValue = `${value} ${keywords?.join(' ')}`;
            return extendValue.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput
            value={value}
            onValueChange={setValue}
            ref={inputRef}
            placeholder={t('search', locale)}
          />
          <CommandEmpty>{t('noresults', locale)}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {columns.map((column) => (
                <FilterableColumn
                  key={column.id}
                  column={column}
                  setProperty={setProperty}
                />
              ))}
              <QuickSearchFilters
                search={value}
                filters={filters}
                columns={columns}
                actions={actions}
                strategy={strategy}
                locale={locale}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [property, column, filter, filters, columns, actions, value],
  );

  return (
    <Popover
      open={open}
      onOpenChange={async (value) => {
        setOpen(value);
        if (!value) setTimeout(() => setProperty(undefined), 100);
      }}
    >
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          before={<FilterAddIcon />}
          isIconOnly={hasFilters}
        >
          {!hasFilters && t('filter', locale)}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        side="bottom"
        style={{ zIndex: 3 }}
        className="popover--no-padding"
      >
        {content}
      </Popover.Content>
    </Popover>
  );
}

export function FilterableColumn<TData, TType extends ColumnDataType, TVal>({
  column,
  setProperty,
}: {
  column: Column<TData, TType, TVal>;
  setProperty: (value: string) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const prefetch = useCallback(() => {
    column.prefetchOptions();
    column.prefetchValues();
    column.prefetchFacetedUniqueValues();
    column.prefetchFacetedMinMaxValues();
  }, [column]);

  useEffect(() => {
    const target = itemRef.current;

    if (!target) return;

    // Set up MutationObserver
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          const isSelected = target.getAttribute('data-selected') === 'true';
          if (isSelected) prefetch();
        }
      }
    });

    // Set up observer
    observer.observe(target, {
      attributes: true,
      attributeFilter: ['data-selected'],
    });

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [prefetch]);

  return (
    <CommandItem
      ref={itemRef}
      value={column.id}
      keywords={[column.displayName]}
      onSelect={() => setProperty(column.id)}
      className="group"
      onMouseEnter={prefetch}
    >
      <div className="filter-selector__column-item-content">
        <div className="filter-selector__column-item-info">
          <column.icon
            strokeWidth={2.25}
            className="filter-selector__column-item-icon"
          />

          <span>{column.displayName}</span>
        </div>
        <ChevronRightIcon className="filter-selector__column-item-chevron" />
      </div>
    </CommandItem>
  );
}

interface QuickSearchFiltersProps<TData> {
  search?: string;
  filters: FiltersState;
  columns: Column<TData>[];
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export const QuickSearchFilters = memo(
  QuickSearchFiltersInternal,
) as typeof QuickSearchFiltersInternal;

function QuickSearchFiltersInternal<TData>({
  search,
  filters,
  columns,
  actions,
  strategy: _strategy,
  locale: _locale = 'en',
}: QuickSearchFiltersProps<TData>) {
  const cols = useMemo(
    () =>
      columns.filter((c) =>
        isAnyOf<ColumnDataType>(c.type, ['option', 'multiOption']),
      ),
    [columns],
  );

  if (!search || search.trim().length < 2) return null;

  return (
    <>
      {cols.map((column) => {
        const filter = filters.find((f) => f.columnId === column.id);
        const options = column.getOptions();
        const optionsCount = column.getFacetedUniqueValues();

        function handleOptionSelect(value: string, check: boolean) {
          if (check) actions.addFilterValue(column, [value]);
          else actions.removeFilterValue(column, [value]);
        }

        return (
          <React.Fragment key={column.id}>
            {options.map((v) => {
              const checked = Boolean(filter?.values.includes(v.value));
              const count = optionsCount?.get(v.value) ?? 0;

              return (
                <CommandItem
                  key={v.value}
                  value={v.value}
                  keywords={[v.label, v.value]}
                  onSelect={() => {
                    handleOptionSelect(v.value, !checked);
                  }}
                  className="group quick-search-filters"
                >
                  <div className="quick-search-filters__option-container">
                    <Checkbox
                      checked={checked}
                      className="quick-search-filters__option-checkbox"
                    />
                    <div className="quick-search-filters__option-icon-wrapper">
                      {v.icon &&
                        (isValidElement(v.icon) ? (
                          v.icon
                        ) : (
                          <v.icon className="quick-search-filters__option-icon" />
                        ))}
                    </div>
                    <div className="quick-search-filters__option-info">
                      <span className="quick-search-filters__option-column-name">
                        {column.displayName}
                      </span>
                      <ChevronRightIcon className="quick-search-filters__option-chevron" />
                      <span>
                        {v.label}
                        <sup
                          className={clsx(
                            !optionsCount &&
                              'quick-search-filters__option-count--hidden',
                            'quick-search-filters__option-count',
                            count === 0 &&
                              'quick-search-filters__option-count--zero',
                          )}
                        >
                          {count < 100 ? count : '100+'}
                        </sup>
                      </span>
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
