/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  Button,
  Calendar,
  Checkbox,
  Popover,
  Slider,
  Tabs,
} from '@soundwaves/components';
import clsx from 'clsx';
import { isEqual } from 'date-fns';
import { format } from 'date-fns';
import {
  cloneElement,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { EllipsisIcon } from '@/components/icons';

import { numberFilterOperators } from '../core/operators';
import { useDebounceCallback } from '../hooks/useDebounceCallback';
import { take } from '../lib/array';
import { createNumberRange } from '../lib/helpers';
import { type Locale, t } from '../lib/i18n';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { DebouncedInput } from '../ui/debouncedInput';

import type {
  Column,
  ColumnDataType,
  ColumnOptionExtended,
  DataTableFilterActions,
  FilterModel,
  FilterStrategy,
} from '../core/types';
// import type { DateRange } from 'react-day-picker';

interface FilterValueProps<TData, TType extends ColumnDataType> {
  filter: FilterModel<TType>;
  column: Column<TData, TType>;
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export const FilterValue = memo(
  FilterValueInternal,
) as typeof FilterValueInternal;

function FilterValueInternal<TData, TType extends ColumnDataType>({
  filter,
  column,
  actions,
  strategy,
  locale,
}: FilterValueProps<TData, TType>) {
  return (
    <Popover>
      <Popover.Anchor className="height-full" />
      <Popover.Trigger asChild>
        <Button
          variant="transparent"
          size="sm"
          className="filter-value__trigger"
        >
          <FilterValueDisplay
            filter={filter}
            column={column}
            actions={actions}
            locale={locale}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        side="bottom"
        className="popover--no-padding"
        style={{ zIndex: 3 }}
      >
        <FilterValueController
          filter={filter}
          column={column}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      </Popover.Content>
    </Popover>
  );
}

interface FilterValueDisplayProps<TData, TType extends ColumnDataType> {
  filter: FilterModel<TType>;
  column: Column<TData, TType>;
  actions: DataTableFilterActions;
  locale?: Locale;
}

export function FilterValueDisplay<TData, TType extends ColumnDataType>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueDisplayProps<TData, TType>) {
  switch (column.type) {
    case 'option':
      return (
        <FilterValueOptionDisplay
          filter={filter as FilterModel<'option'>}
          column={column as Column<TData, 'option'>}
          actions={actions}
          locale={locale}
        />
      );
    case 'multiOption':
      return (
        <FilterValueMultiOptionDisplay
          filter={filter as FilterModel<'multiOption'>}
          column={column as Column<TData, 'multiOption'>}
          actions={actions}
          locale={locale}
        />
      );
    case 'date':
      return (
        <FilterValueDateDisplay
          filter={filter as FilterModel<'date'>}
          column={column as Column<TData, 'date'>}
          actions={actions}
          locale={locale}
        />
      );
    case 'text':
      return (
        <FilterValueTextDisplay
          filter={filter as FilterModel<'text'>}
          column={column as Column<TData, 'text'>}
          actions={actions}
          locale={locale}
        />
      );
    case 'number':
      return (
        <FilterValueNumberDisplay
          filter={filter as FilterModel<'number'>}
          column={column as Column<TData, 'number'>}
          actions={actions}
          locale={locale}
        />
      );
    default:
      return null;
  }
}

export function FilterValueOptionDisplay<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueDisplayProps<TData, 'option'>) {
  const options = useMemo(() => column.getOptions(), [column]);
  const selected = options.filter((o) => filter?.values.includes(o.value));

  // We display the selected options based on how many are selected
  //
  // If there is only one option selected, we display its icon and label
  //
  // If there are multiple options selected, we display:
  // 1) up to 3 icons of the selected options
  // 2) the number of selected options
  if (selected.length === 1) {
    const { label, icon: Icon } = selected[0];
    const hasIcon = !!Icon;
    return (
      <span className="filter-value__option-display">
        {hasIcon &&
          (isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon className="filter-value__option-display-icon" />
          ))}
        <span>{label}</span>
      </span>
    );
  }
  const name = column.displayName.toLowerCase();
  // TODO: Better pluralization for different languages
  const pluralName = name.endsWith('s') ? `${name}es` : `${name}s`;

  const hasOptionIcons = !options?.some((o) => !o.icon);

  return (
    <div className="filter-value__option-display">
      {hasOptionIcons && (
        <span className="filter-value__option-display-icons">
          {take(selected, 3).map(({ value, icon }) => {
            const Icon = icon!;
            return isValidElement(Icon) ? (
              Icon
            ) : (
              <Icon
                key={value}
                className="filter-value__option-display-icons-item"
              />
            );
          })}
        </span>
      )}
      <span className="filter-value__option-display-count">
        {selected.length} {pluralName}
      </span>
    </div>
  );
}

export function FilterValueMultiOptionDisplay<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueDisplayProps<TData, 'multiOption'>) {
  const options = useMemo(() => column.getOptions(), [column]);
  const selected = options.filter((o) => filter.values.includes(o.value));

  if (selected.length === 1) {
    const { label, icon: Icon } = selected[0];
    const hasIcon = !!Icon;
    return (
      <span className="filter-value__option-display">
        {hasIcon &&
          (isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon className="filter-value__option-display-icon" />
          ))}

        <span>{label}</span>
      </span>
    );
  }

  const name = column.displayName.toLowerCase();

  const hasOptionIcons = !options?.some((o) => !o.icon);

  return (
    <div className="inline-flex items-center gap-1.5">
      {hasOptionIcons && (
        <div key="icons" className="inline-flex items-center gap-0.5">
          {take(selected, 3).map(({ value, icon }) => {
            const Icon = icon!;
            return isValidElement(Icon) ? (
              cloneElement(Icon, { key: value })
            ) : (
              <Icon key={value} className="size-4" />
            );
          })}
        </div>
      )}
      <span>
        {selected.length} {name}
      </span>
    </div>
  );
}

function formatDateRange(start: Date, end: Date) {
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`;
  }

  if (sameYear) {
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  }

  return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
}

export function FilterValueDateDisplay<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueDisplayProps<TData, 'date'>) {
  if (!filter) return null;
  if (filter.values.length === 0) return <EllipsisIcon />;
  if (filter.values.length === 1) {
    const value = filter.values[0];

    const formattedDateStr = format(value, 'MMM d, yyyy');

    return <span>{formattedDateStr}</span>;
  }

  const formattedRangeStr = formatDateRange(filter.values[0], filter.values[1]);

  return <span>{formattedRangeStr}</span>;
}

export function FilterValueTextDisplay<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueDisplayProps<TData, 'text'>) {
  if (!filter) return null;
  if (filter.values.length === 0 || filter.values[0].trim() === '')
    return <EllipsisIcon className="size-4" />;

  const value = filter.values[0];

  return <span>{value}</span>;
}

export function FilterValueNumberDisplay<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueDisplayProps<TData, 'number'>) {
  if (!filter || !filter.values || filter.values.length === 0) return null;

  if (
    filter.operator === 'is between' ||
    filter.operator === 'is not between'
  ) {
    const minValue = filter.values[0];
    const maxValue = filter.values[1];

    return (
      <span className="tabular-nums tracking-tight">
        {minValue} {t('and', locale)} {maxValue}
      </span>
    );
  }

  const value = filter.values[0];
  return <span className="tabular-nums tracking-tight">{value}</span>;
}

/****** Property Filter Value Controller ******/

interface FilterValueControllerProps<TData, TType extends ColumnDataType> {
  filter: FilterModel<TType>;
  column: Column<TData, TType>;
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export const FilterValueController = memo(
  __FilterValueController,
) as typeof __FilterValueController;

function __FilterValueController<TData, TType extends ColumnDataType>({
  filter,
  column,
  actions,
  strategy,
  locale = 'en',
}: FilterValueControllerProps<TData, TType>) {
  switch (column.type) {
    case 'option':
      return (
        <FilterValueOptionController
          filter={filter as FilterModel<'option'>}
          column={column as Column<TData, 'option'>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      );
    case 'multiOption':
      return (
        <FilterValueMultiOptionController
          filter={filter as FilterModel<'multiOption'>}
          column={column as Column<TData, 'multiOption'>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      );
    case 'date':
      return (
        <FilterValueDateController
          filter={filter as FilterModel<'date'>}
          column={column as Column<TData, 'date'>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      );
    case 'text':
      return (
        <FilterValueTextController
          filter={filter as FilterModel<'text'>}
          column={column as Column<TData, 'text'>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      );
    case 'number':
      return (
        <FilterValueNumberController
          filter={filter as FilterModel<'number'>}
          column={column as Column<TData, 'number'>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      );
    default:
      return null;
  }
}

interface OptionItemProps {
  option: ColumnOptionExtended & { initialSelected: boolean };
  onToggle: (value: string, checked: boolean) => void;
}

// Memoized option item to prevent re-renders unless its own props change
const OptionItem = memo(function OptionItem({
  option,
  onToggle,
}: OptionItemProps) {
  const { value, label, icon: Icon, selected, count } = option;
  const handleSelect = useCallback(() => {
    onToggle(value, !selected);
  }, [onToggle, value, selected]);

  return (
    <CommandItem key={value} onSelect={handleSelect} className="group">
      <div className="option-item">
        <Checkbox checked={selected} />
        {Icon &&
          (isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon className="option-item__icon" />
          ))}
        <span>
          {label}
          <sup
            className={clsx(
              count == null && 'option-item__count--hidden',
              'option-item__count',
              count === 0 && 'option-item__count--slashed-zero',
            )}
          >
            {typeof count === 'number' ? (count < 100 ? count : '100+') : ''}
          </sup>
        </span>
      </div>
    </CommandItem>
  );
});

export function FilterValueOptionController<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueControllerProps<TData, 'option'>) {
  // Compute initial options once per mount
  const initialOptions = useMemo(() => {
    const counts = column.getFacetedUniqueValues();
    return column.getOptions().map((o) => ({
      ...o,
      selected: filter?.values.includes(o.value),
      initialSelected: filter?.values.includes(o.value),
      count: counts?.get(o.value) ?? 0,
    }));
  }, []);

  const [options, setOptions] = useState(initialOptions);

  // Update selected state when filter values change
  useEffect(() => {
    setOptions((prev) =>
      prev.map((o) => ({ ...o, selected: filter?.values.includes(o.value) })),
    );
  }, [filter?.values]);

  const handleToggle = useCallback(
    (value: string, checked: boolean) => {
      if (checked) actions.addFilterValue(column, [value]);
      else actions.removeFilterValue(column, [value]);
    },
    [actions, column],
  );

  // Derive groups based on `initialSelected` only
  const { selectedOptions, unselectedOptions } = useMemo(() => {
    const sel: typeof options = [];
    const unsel: typeof options = [];
    for (const o of options) {
      if (o.initialSelected) sel.push(o);
      else unsel.push(o);
    }
    return { selectedOptions: sel, unselectedOptions: unsel };
  }, [options]);

  return (
    <Command loop>
      <CommandInput autoFocus placeholder={t('search', locale)} />
      <CommandEmpty>{t('noresults', locale)}</CommandEmpty>
      <CommandList className="max-h-fit">
        <CommandGroup
          className={clsx(selectedOptions.length === 0 && 'hidden')}
        >
          {selectedOptions.map((option) => (
            <OptionItem
              key={option.value}
              option={option}
              onToggle={handleToggle}
            />
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup
          className={clsx(unselectedOptions.length === 0 && 'hidden')}
        >
          {unselectedOptions.map((option) => (
            <OptionItem
              key={option.value}
              option={option}
              onToggle={handleToggle}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueMultiOptionController<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueControllerProps<TData, 'multiOption'>) {
  // Compute initial options once per mount
  const initialOptions = useMemo(() => {
    const counts = column.getFacetedUniqueValues();
    return column.getOptions().map((o) => {
      const selected = filter?.values.includes(o.value);
      return {
        ...o,
        selected,
        initialSelected: selected,
        count: counts?.get(o.value),
      };
    });
  }, []);

  const [options, setOptions] = useState(initialOptions);

  // Update selected state when filter values change
  useEffect(() => {
    setOptions((prev) =>
      prev.map((o) => ({ ...o, selected: filter?.values.includes(o.value) })),
    );
  }, [filter?.values]);

  const handleToggle = useCallback(
    (value: string, checked: boolean) => {
      if (checked) actions.addFilterValue(column, [value]);
      else actions.removeFilterValue(column, [value]);
    },
    [actions, column],
  );

  // Derive groups based on `initialSelected` only
  const { selectedOptions, unselectedOptions } = useMemo(() => {
    const sel: typeof options = [];
    const unsel: typeof options = [];
    for (const o of options) {
      if (o.initialSelected) sel.push(o);
      else unsel.push(o);
    }
    return { selectedOptions: sel, unselectedOptions: unsel };
  }, [options]);

  return (
    <Command loop>
      <CommandInput autoFocus placeholder={t('search', locale)} />
      <CommandEmpty>{t('noresults', locale)}</CommandEmpty>
      <CommandList>
        <CommandGroup
          className={clsx(selectedOptions.length === 0 && 'hidden')}
        >
          {selectedOptions.map((option) => (
            <OptionItem
              key={option.value}
              option={option}
              onToggle={handleToggle}
            />
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup
          className={clsx(unselectedOptions.length === 0 && 'hidden')}
        >
          {unselectedOptions.map((option) => (
            <OptionItem
              key={option.value}
              option={option}
              onToggle={handleToggle}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueDateController<TData>({
  filter,
  column,
  actions,
}: FilterValueControllerProps<TData, 'date'>) {
  const [date, setDate] = useState<
    { from: Date | undefined; to: Date | undefined } | undefined
  >({
    from: filter?.values[0] ?? new Date(),
    to: filter?.values[1] ?? undefined,
  });

  function changeDateRange(
    value: { from: Date | undefined; to: Date | undefined } | undefined,
  ) {
    const start = value?.from;
    const end =
      start && value && value.to && !isEqual(start, value.to)
        ? value.to
        : undefined;

    setDate({ from: start, to: end });

    const isRange = start && end;
    const newValues = isRange ? [start, end] : start ? [start] : [];

    actions.setFilterValue(column, newValues);
  }

  return (
    <Command>
      <CommandList className="max-h-fit">
        <CommandGroup>
          <div>
            <Calendar
            // initialFocus
            // mode="range"
            // defaultMonth={date?.from}
            // selected={date}
            // onSelect={changeDateRange}
            // numberOfMonths={1}
            />
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueTextController<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueControllerProps<TData, 'text'>) {
  const changeText = (value: string | number) => {
    actions.setFilterValue(column, [String(value)]);
  };

  return (
    <Command>
      <CommandList className="max-h-fit">
        <CommandGroup>
          <CommandItem>
            <DebouncedInput
              placeholder={t('search', locale)}
              autoFocus
              value={filter?.values[0] ?? ''}
              onChange={changeText}
            />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function FilterValueNumberController<TData>({
  filter,
  column,
  actions,
  locale = 'en',
}: FilterValueControllerProps<TData, 'number'>) {
  const minMax = useMemo(() => column.getFacetedMinMaxValues(), [column]);
  const [sliderMin, sliderMax] = [
    minMax ? minMax[0] : 0,
    minMax ? minMax[1] : 0,
  ];

  // Local state for values
  const [values, setValues] = useState(filter?.values ?? [0, 0]);

  // Sync with parent filter changes
  useEffect(() => {
    if (
      filter?.values &&
      filter.values.length === values.length &&
      filter.values.every((v, i) => v === values[i])
    ) {
      setValues(filter.values);
    }
  }, [filter?.values, values]);

  const isNumberRange =
    // filter && values.length === 2
    filter && numberFilterOperators[filter.operator].target === 'multiple';

  const setFilterOperatorDebounced = useDebounceCallback(
    actions.setFilterOperator,
    500,
  );
  const setFilterValueDebounced = useDebounceCallback(
    actions.setFilterValue,
    500,
  );

  const changeNumber = (value: number[]) => {
    setValues(value);
    setFilterValueDebounced(column as any, value);
  };

  const changeMinNumber = (value: number) => {
    const newValues = createNumberRange([value, values[1]]);
    setValues(newValues);
    setFilterValueDebounced(column as any, newValues);
  };

  const changeMaxNumber = (value: number) => {
    const newValues = createNumberRange([values[0], value]);
    setValues(newValues);
    setFilterValueDebounced(column as any, newValues);
  };

  const changeType = useCallback(
    (type: 'single' | 'range') => {
      let newValues: number[] = [];
      if (type === 'single')
        newValues = [values[0]]; // Keep the first value for single mode
      else if (!minMax)
        newValues = createNumberRange([values[0], values[1] ?? 0]);
      else {
        const value = values[0];
        newValues =
          value - minMax[0] < minMax[1] - value
            ? createNumberRange([value, minMax[1]])
            : createNumberRange([minMax[0], value]);
      }

      const newOperator = type === 'single' ? 'is' : 'is between';

      // Update local state
      setValues(newValues);

      // Cancel in-flight debounced calls to prevent flicker/race conditions
      setFilterOperatorDebounced.cancel();
      setFilterValueDebounced.cancel();

      // Update global filter state atomically
      actions.setFilterOperator(column.id, newOperator);
      actions.setFilterValue(column, newValues);
    },
    [values, column, actions, minMax],
  );

  return (
    <Command>
      <CommandList className="w-[300px] px-2 py-2">
        <CommandGroup>
          <div className="flex flex-col w-full">
            <Tabs
              variant="contained-bottom"
              value={isNumberRange ? 'range' : 'single'}
              onValueChange={(v) => changeType(v as 'single' | 'range')}
            >
              <Tabs.List className="w-full *:text-xs">
                <Tabs.Trigger value="single">
                  {t('single', locale)}
                </Tabs.Trigger>
                <Tabs.Trigger value="range">{t('range', locale)}</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="single" className="flex flex-col gap-4 mt-4">
                {minMax && (
                  <Slider
                    value={[values[0]]}
                    onValueChange={(value) => changeNumber(value)}
                    min={sliderMin}
                    max={sliderMax}
                    step={1}
                    aria-orientation="horizontal"
                  />
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">
                    {t('value', locale)}
                  </span>
                  <DebouncedInput
                    id="single"
                    type="number"
                    value={values[0].toString()} // Use values[0] directly
                    onChange={(v) => changeNumber([Number(v)])}
                  />
                </div>
              </Tabs.Content>
              <Tabs.Content value="range" className="flex flex-col gap-4 mt-4">
                {minMax && (
                  <Slider
                    value={values} // Use values directly
                    onValueChange={changeNumber}
                    min={sliderMin}
                    max={sliderMax}
                    step={1}
                    aria-orientation="horizontal"
                  />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      {t('min', locale)}
                    </span>
                    <DebouncedInput
                      type="number"
                      value={values[0]}
                      onChange={(v) => changeMinNumber(Number(v))}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">
                      {t('max', locale)}
                    </span>
                    <DebouncedInput
                      type="number"
                      value={values[1]}
                      onChange={(v) => changeMaxNumber(Number(v))}
                    />
                  </div>
                </div>
              </Tabs.Content>
            </Tabs>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
