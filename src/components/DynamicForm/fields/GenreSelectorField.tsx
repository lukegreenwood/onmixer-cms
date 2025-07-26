import { useQuery, useMutation } from '@apollo/client';
import { Autocomplete, Loading } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo, useState } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import {
  GenreFilterType,
  GenreOptionFilterField,
  GenreOrderField,
  GenreTextFilterField,
  OperatorType,
  OptionFilterOperator,
  OrderDirection,
  TextFilterOperator,
} from '@/graphql/__generated__/graphql';
import { CREATE_GENRE } from '@/graphql/mutations/createGenre';
import { GET_GENRES } from '@/graphql/queries/genres';

type GenreOption = {
  label: string;
  value: string;
};

interface GenreSelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
  required?: boolean;
}

export const GenreSelectorField = <T extends FieldValues>({
  name,
  label,
  helperText,
  placeholder = 'Select or create a genre...',
  ...restProps
}: GenreSelectorFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  const {
    data: genresData,
    refetch: refetchGenres,
    loading,
  } = useQuery(GET_GENRES, {
    variables: {
      filters: {
        limit: 30,
        filterGroup: {
          operator: OperatorType.Or,
          filters: [
            {
              optionFilter: {
                field: GenreOptionFilterField.Id,
                operator: OptionFilterOperator.Is,
                value,
              },
              type: GenreFilterType.Option,
            },
            {
              textFilter: {
                field: GenreTextFilterField.Name,
                operator: TextFilterOperator.Contains,
                value: '',
              },
              type: GenreFilterType.Text,
            },
          ],
        },
      },
    },
  });
  const [createGenre, { loading: isCreatingGenre }] = useMutation(CREATE_GENRE);

  // Convert to autocomplete options
  const genreOptions: GenreOption[] = useMemo(() => {
    const items = genresData?.genresV2.items.map((genre) => ({
      label: genre.name,
      value: genre.id,
    }));

    return items || [];
  }, [genresData?.genresV2.items]);

  // Add "Create" option if search term doesn't match any existing genre
  const options = useMemo(() => {
    if (
      genreOptions.find((option) =>
        option.label.toLowerCase().includes(searchTerm),
      )
    ) {
      return genreOptions;
    }

    return [
      ...genreOptions,
      {
        value: `CREATE:${searchTerm}`,
        label: `Create "${searchTerm}"`,
      },
    ];
  }, [genreOptions, searchTerm]);

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    refetchGenres({
      filters: {
        limit: 30,
        order: [
          {
            direction: OrderDirection.Descending,
            field: GenreOrderField.Name,
          },
        ],
        filterGroup: {
          operator: OperatorType.Or,
          filters: [
            {
              optionFilter: {
                field: GenreOptionFilterField.Id,
                operator: OptionFilterOperator.Is,
                value,
              },
              type: GenreFilterType.Option,
            },
            {
              textFilter: {
                field: GenreTextFilterField.Name,
                operator: TextFilterOperator.Contains,
                value: search,
              },
              type: GenreFilterType.Text,
            },
          ],
        },
      },
    });
  };

  const debouncedHandleSearch = useDebouncer(handleSearchChange, { wait: 300 });

  const handleCreateGenre = async (genreName: string) => {
    if (!genreName.trim()) return;

    try {
      const result = await createGenre({
        variables: {
          input: {
            name: genreName.trim(),
          },
        },
      });

      if (result.data?.createGenre?.success && result.data.createGenre.genre) {
        // Refetch genres to get the updated list
        await refetchGenres();
        // Set the newly created genre as selected
        onChange(result.data.createGenre.genre.id);
      }
    } catch (error) {
      console.error('Failed to create genre:', error);
    }
  };

  const handleSelectionChange = async (selectedValue: string | null) => {
    if (!selectedValue) {
      onChange('');
      return;
    }

    if (selectedValue.startsWith('CREATE:')) {
      const genreName = selectedValue.replace('CREATE:', '');
      await handleCreateGenre(genreName);
    } else {
      onChange(selectedValue);
    }
  };

  return (
    <Autocomplete
      {...rest}
      {...restProps}
      label={label}
      placeholder={placeholder}
      value={value || undefined}
      onChange={handleSelectionChange}
      options={options}
      onSearch={debouncedHandleSearch.maybeExecute}
      destructive={Boolean(error)}
      helperText={error?.message ?? helperText}
      after={loading || isCreatingGenre ? <Loading size="xs" /> : undefined}
      clearable
    />
  );
};
