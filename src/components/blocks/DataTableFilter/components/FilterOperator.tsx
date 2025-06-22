'use client';

import { Button, Popover } from '@soundwaves/components';
import { useState } from 'react';

import {
  booleanFilterOperators,
  dateFilterOperators,
  filterTypeOperatorDetails,
  multiOptionFilterOperators,
  numberFilterOperators,
  optionFilterOperators,
  textFilterOperators,
} from '../core/operators';
import { type Locale, t } from '../lib/i18n';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

import type {
  Column,
  ColumnDataType,
  DataTableFilterActions,
  FilterModel,
  FilterOperators,
} from '../core/types';

interface FilterOperatorProps<TData, TType extends ColumnDataType> {
  column: Column<TData, TType>;
  filter: FilterModel<TType>;
  actions: DataTableFilterActions;
  locale?: Locale;
}

// Renders the filter operator display and menu for a given column filter
// The filter operator display is the label and icon for the filter operator
// The filter operator menu is the dropdown menu for the filter operator
export function FilterOperator<TData, TType extends ColumnDataType>({
  column,
  filter,
  actions,
  locale = 'en',
}: FilterOperatorProps<TData, TType>) {
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="transparent"
          size="sm"
          className="filter-operator__trigger"
        >
          <FilterOperatorDisplay
            filter={filter}
            columnType={column.type}
            locale={locale}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        className="popover--no-padding"
        style={{ zIndex: 3 }}
      >
        <Command loop>
          <CommandInput placeholder={t('search', locale)} />
          <CommandEmpty>{t('noresults', locale)}</CommandEmpty>
          <CommandList className="max-h-fit">
            <FilterOperatorController
              filter={filter}
              column={column}
              actions={actions}
              closeController={close}
              locale={locale}
            />
          </CommandList>
        </Command>
      </Popover.Content>
    </Popover>
  );
}

interface FilterOperatorDisplayProps<TType extends ColumnDataType> {
  filter: FilterModel<TType>;
  columnType: TType;
  locale?: Locale;
}

export function FilterOperatorDisplay<TType extends ColumnDataType>({
  filter,
  columnType,
  locale = 'en',
}: FilterOperatorDisplayProps<TType>) {
  const operator = filterTypeOperatorDetails[columnType][filter.operator];
  const label = t(operator.key, locale);

  return <span className="filter-operator__display">{label}</span>;
}

interface FilterOperatorControllerProps<TData, TType extends ColumnDataType> {
  filter: FilterModel<TType>;
  column: Column<TData, TType>;
  actions: DataTableFilterActions;
  closeController: () => void;
  locale?: Locale;
}

/*
 *
 * TODO: Reduce into a single component. Each data type does not need it's own controller.
 *
 */
export function FilterOperatorController<TData, TType extends ColumnDataType>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, TType>) {
  switch (column.type) {
    case 'option':
      return (
        <FilterOperatorOptionController
          filter={filter as FilterModel<'option'>}
          column={column as Column<TData, 'option'>}
          actions={actions}
          closeController={closeController}
          locale={locale}
        />
      );
    case 'multiOption':
      return (
        <FilterOperatorMultiOptionController
          filter={filter as FilterModel<'multiOption'>}
          column={column as Column<TData, 'multiOption'>}
          actions={actions}
          closeController={closeController}
          locale={locale}
        />
      );
    case 'date':
      return (
        <FilterOperatorDateController
          filter={filter as FilterModel<'date'>}
          column={column as Column<TData, 'date'>}
          actions={actions}
          closeController={closeController}
          locale={locale}
        />
      );
    case 'text':
      return (
        <FilterOperatorTextController
          filter={filter as FilterModel<'text'>}
          column={column as Column<TData, 'text'>}
          actions={actions}
          closeController={closeController}
          locale={locale}
        />
      );
    case 'number':
      return (
        <FilterOperatorNumberController
          filter={filter as FilterModel<'number'>}
          column={column as Column<TData, 'number'>}
          actions={actions}
          closeController={closeController}
          locale={locale}
        />
      );
    case 'boolean':
      return (
        <FilterOperatorBooleanController
          filter={filter as FilterModel<'boolean'>}
          column={column as Column<TData, 'boolean'>}
          actions={actions}
          closeController={closeController}
          locale={locale}
        />
      );
    default:
      return null;
  }
}

function FilterOperatorOptionController<TData>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, 'option'>) {
  const filterDetails = optionFilterOperators[filter.operator];

  const relatedFilters = Object.values(optionFilterOperators).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    actions?.setFilterOperator(column.id, value as FilterOperators['option']);
    closeController();
  };

  return (
    <CommandGroup heading={t('operators', locale)}>
      {relatedFilters.map((r) => {
        return (
          <CommandItem onSelect={changeOperator} value={r.value} key={r.value}>
            {t(r.key, locale)}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function FilterOperatorMultiOptionController<TData>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, 'multiOption'>) {
  const filterDetails = multiOptionFilterOperators[filter.operator];

  const relatedFilters = Object.values(multiOptionFilterOperators).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    actions?.setFilterOperator(
      column.id,
      value as FilterOperators['multiOption'],
    );
    closeController();
  };

  return (
    <CommandGroup heading={t('operators', locale)}>
      {relatedFilters.map((r) => {
        return (
          <CommandItem onSelect={changeOperator} value={r.value} key={r.value}>
            {t(r.key, locale)}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function FilterOperatorDateController<TData>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, 'date'>) {
  const filterDetails = dateFilterOperators[filter.operator];

  const relatedFilters = Object.values(dateFilterOperators).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    actions?.setFilterOperator(column.id, value as FilterOperators['date']);
    closeController();
  };

  return (
    <CommandGroup>
      {relatedFilters.map((r) => {
        return (
          <CommandItem onSelect={changeOperator} value={r.value} key={r.value}>
            {t(r.key, locale)}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

export function FilterOperatorTextController<TData>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, 'text'>) {
  const filterDetails = textFilterOperators[filter.operator];

  const relatedFilters = Object.values(textFilterOperators).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    actions?.setFilterOperator(column.id, value as FilterOperators['text']);
    closeController();
  };

  return (
    <CommandGroup heading={t('operators', locale)}>
      {relatedFilters.map((r) => {
        return (
          <CommandItem onSelect={changeOperator} value={r.value} key={r.value}>
            {t(r.key, locale)}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

function FilterOperatorNumberController<TData>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, 'number'>) {
  const filterDetails = numberFilterOperators[filter.operator];

  const relatedFilters = Object.values(numberFilterOperators).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    actions?.setFilterOperator(column.id, value as FilterOperators['number']);
    closeController();
  };

  return (
    <div>
      <CommandGroup heading={t('operators', locale)}>
        {relatedFilters.map((r) => (
          <CommandItem
            onSelect={() => changeOperator(r.value)}
            value={r.value}
            key={r.value}
          >
            {t(r.key, locale)}
          </CommandItem>
        ))}
      </CommandGroup>
    </div>
  );
}

function FilterOperatorBooleanController<TData>({
  filter,
  column,
  actions,
  closeController,
  locale = 'en',
}: FilterOperatorControllerProps<TData, 'boolean'>) {
  const filterDetails = booleanFilterOperators[filter.operator];

  const relatedFilters = Object.values(booleanFilterOperators).filter(
    (o) => o.target === filterDetails.target,
  );

  const changeOperator = (value: string) => {
    actions?.setFilterOperator(column.id, value as FilterOperators['boolean']);
    closeController();
  };

  return (
    <CommandGroup heading={t('operators', locale)}>
      {relatedFilters.map((r) => {
        return (
          <CommandItem onSelect={changeOperator} value={r.value} key={r.value}>
            {t(r.key, locale)}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}
