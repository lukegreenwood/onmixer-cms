import { useQuery } from '@apollo/client';
import { Autocomplete, Loading } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import {
  OperatorType,
  EpisodeFilterType,
  EpisodeTextFilterField,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import { SEARCH_EPISODES_V2 } from '@/graphql/queries';

type EpisodeOption = {
  label: string;
  value: string;
};

type EpisodeObject = {
  id: string;
  name: string;
  show?: {
    id: string;
    shortName: string;
  };
};

interface EpisodeSelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  _placeholder?: string;
  className?: string;
  helperText?: string;
  _required?: boolean;
}

export const EpisodeSelectorField = <T extends FieldValues>({
  name,
  label,
  helperText,
  ...restProps
}: EpisodeSelectorFieldProps<T>) => {
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  // Convert episode object to Autocomplete format
  const selectedOption: EpisodeOption | null = useMemo(() => {
    if (!value || !value.id) return null;
    const episodeValue = value as EpisodeObject;
    const showInfo = episodeValue.show?.shortName 
      ? ` (${episodeValue.show.shortName})`
      : '';
    return {
      label: `${episodeValue.name}${showInfo}`,
      value: episodeValue.id,
    };
  }, [value]);

  const { data, refetch, loading } = useQuery(SEARCH_EPISODES_V2, {
    notifyOnNetworkStatusChange: true,
    variables: {
      filters: {
        limit: 20,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: EpisodeFilterType.Text,
              textFilter: {
                field: EpisodeTextFilterField.Name,
                value: '',
                operator: TextFilterOperator.Contains,
              },
            },
          ],
        },
      },
    },
  });

  const searchOptions: EpisodeOption[] = useMemo(
    () =>
      data?.episodesV2.items.map((episode) => ({
        label: `${episode.name} (${episode.show.shortName})`,
        value: episode.id,
      })) ?? [],
    [data?.episodesV2.items],
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
        limit: 20,
        filterGroup: {
          operator: OperatorType.And,
          filters: [
            {
              type: EpisodeFilterType.Text,
              textFilter: {
                field: EpisodeTextFilterField.Name,
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
      onChange({ id: '', name: '' });
      return;
    }

    const option = options.find((opt) => opt.value === selectedId);
    const episodeFromData = data?.episodesV2.items.find(
      (ep) => ep.id === selectedId,
    );

    if (option && episodeFromData) {
      onChange({
        id: selectedId,
        name: episodeFromData.name,
        show: episodeFromData.show,
      });
    }
  };

  return (
    <Autocomplete
      {...rest}
      {...restProps}
      label={label}
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