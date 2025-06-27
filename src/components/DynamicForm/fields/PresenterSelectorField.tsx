import { useQuery } from '@apollo/client';
import { MultiSelect } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import {
  OperatorType,
  PresenterFilterType,
  PresenterTextFilterField,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import { GET_PRESENTERS } from '@/graphql/queries/presenters';

type PresenterOption = {
  label: string;
  value: string;
};

type PresenterObject = {
  id: string;
  name: string;
};

interface PresenterSelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
}

export const PresenterSelectorField = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Select presenters...',
  className = '',
  helperText,
}: PresenterSelectorFieldProps<T>) => {
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  // Convert presenter objects to MultiSelect format
  const selectedOptions: PresenterOption[] = useMemo(() => {
    if (!value || !Array.isArray(value)) return [];
    return value.map((presenter: PresenterObject) => ({
      label: presenter.name,
      value: presenter.id,
    }));
  }, [value]);

  const { data, refetch } = useQuery(GET_PRESENTERS, {
    variables: {
      filters: {
        limit: 10,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: PresenterFilterType.Text,
              textFilter: {
                field: PresenterTextFilterField.Name,
                value: '',
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    },
  });

  const searchOptions: PresenterOption[] = useMemo(
    () =>
      data?.presentersV2.items.map((presenter) => ({
        label: presenter.name,
        value: presenter.id,
      })) ?? [],
    [data?.presentersV2.items],
  );

  const options = useMemo(() => {
    const selectedIds = new Set(selectedOptions.map((opt) => opt.value));
    const uniqueSearchOptions = searchOptions.filter(
      (opt) => !selectedIds.has(opt.value),
    );
    return [...selectedOptions, ...uniqueSearchOptions];
  }, [selectedOptions, searchOptions]);

  const handleSearchChange = (search: string) => {
    refetch({
      filters: {
        limit: 10,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: PresenterFilterType.Text,
              textFilter: {
                field: PresenterTextFilterField.Name,
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

  const handleSelectionChange = (selectedIds: string[]) => {
    const selectedPresenters = selectedIds.map((id) => {
      const option = options.find((opt) => opt.value === id);
      return {
        id,
        name: option?.label || '',
      };
    });
    onChange(selectedPresenters);
  };

  return (
    <MultiSelect
      {...rest}
      label={label}
      placeholder={placeholder}
      className={className}
      value={selectedOptions.map((opt) => opt.value)}
      onChange={handleSelectionChange}
      options={options}
      onSearchChange={debouncedHandleSearch.maybeExecute}
      destructive={Boolean(error)}
      helperText={error?.message ?? helperText}
    />
  );
};
