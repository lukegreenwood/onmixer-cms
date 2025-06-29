import { useQuery } from '@apollo/client';
import { Autocomplete, Loading } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import {
  OperatorType,
  SeriesFilterType,
  SeriesTextFilterField,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import { SEARCH_SERIES } from '@/graphql/queries';

type SeriesOption = {
  label: string;
  value: string;
};

type SeriesObject = {
  id: string;
  name: string;
};

interface SeriesSelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  className?: string;
  helperText?: string;
}

export const SeriesSelectorField = <T extends FieldValues>({
  name,
  label,
  className = '',
  helperText,
  ...restProps
}: SeriesSelectorFieldProps<T>) => {
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  // Convert series object to Autocomplete format
  const selectedOption: SeriesOption | null = useMemo(() => {
    if (!value || !value.id) return null;
    const seriesValue = value as SeriesObject;
    return {
      label: seriesValue.name,
      value: seriesValue.id,
    };
  }, [value]);

  const { data, refetch, loading } = useQuery(SEARCH_SERIES, {
    notifyOnNetworkStatusChange: true,
    variables: {
      filters: {
        limit: 10,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: SeriesFilterType.Text,
              textFilter: {
                field: SeriesTextFilterField.FullName,
                value: '',
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    },
  });

  const searchOptions: SeriesOption[] = useMemo(
    () =>
      data?.seriesListV2.items.map((series) => ({
        label: `${series.fullName} (${series.shortName})`,
        value: series.id,
      })) ?? [],
    [data?.seriesListV2.items],
  );

  // Combine selected option with search options, avoiding duplicates
  const options = useMemo(() => {
    if (!selectedOption) return searchOptions;

    const selectedId = selectedOption.value;
    const uniqueSearchOptions = searchOptions.filter(
      (opt) => opt.value !== selectedId,
    );
    return [selectedOption, ...uniqueSearchOptions];
  }, [selectedOption, searchOptions]);

  const handleSearchChange = (search: string) => {
    refetch({
      filters: {
        limit: 10,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: SeriesFilterType.Text,
              textFilter: {
                field: SeriesTextFilterField.FullName,
                value: search,
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    });
  };

  const debouncedHandleSearch = useDebouncer(handleSearchChange, { wait: 500 });

  const handleSelectionChange = (selectedId: string | null) => {
    if (!selectedId) {
      onChange(undefined);
      return;
    }

    const option = options.find((opt) => opt.value === selectedId);
    if (option) {
      onChange({
        id: selectedId,
        name: option.label,
      });
    }
  };

  return (
    <Autocomplete
      {...rest}
      {...restProps}
      label={label}
      className={className}
      value={selectedOption?.value || undefined}
      onChange={handleSelectionChange}
      options={options}
      onSearch={debouncedHandleSearch.maybeExecute}
      destructive={Boolean(error)}
      helperText={error?.message ?? helperText}
      after={loading ? <Loading size="xs" /> : undefined}
      clearable
    />
  );
};
