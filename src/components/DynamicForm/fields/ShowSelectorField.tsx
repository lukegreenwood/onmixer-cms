import { useQuery } from '@apollo/client';
import { Autocomplete, ProgressCircle } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import {
  OperatorType,
  ShowFilterType,
  ShowTextFilterField,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import { SEARCH_SHOWS } from '@/graphql/queries';

type ShowOption = {
  label: string;
  value: string;
};

type ShowObject = {
  id: string;
  name: string;
};

interface ShowSelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
}

export const ShowSelectorField = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Search for shows...',
  className = '',
  helperText,
}: ShowSelectorFieldProps<T>) => {
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  // Convert show object to Autocomplete format
  const selectedOption: ShowOption | null = useMemo(() => {
    if (!value || typeof value !== 'object') return null;
    const showValue = value as ShowObject;
    return {
      label: showValue.name,
      value: showValue.id,
    };
  }, [value]);

  const { data, refetch, loading } = useQuery(SEARCH_SHOWS, {
    variables: {
      filters: {
        limit: 10,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: ShowFilterType.Text,
              textFilter: {
                field: ShowTextFilterField.FullName,
                value: '',
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    },
  });

  const searchOptions: ShowOption[] = useMemo(
    () =>
      data?.showsV2.items.map((show) => ({
        label: show.fullName,
        value: show.id,
      })) ?? [],
    [data?.showsV2.items],
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
              type: ShowFilterType.Text,
              textFilter: {
                field: ShowTextFilterField.FullName,
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
      onChange(null);
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
      label={label}
      placeholder={placeholder}
      className={className}
      value={selectedOption?.value || undefined}
      onChange={handleSelectionChange}
      options={options}
      onSearch={debouncedHandleSearch.maybeExecute}
      destructive={Boolean(error)}
      helperText={error?.message ?? helperText}
      after={loading ? <ProgressCircle size="xs" /> : undefined}
      clearable
    />
  );
};
