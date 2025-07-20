import { useQuery, useMutation } from '@apollo/client';
import { Autocomplete, Loading } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo, useState } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

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
  placeholder = "Select or create a genre...",
  ...restProps
}: GenreSelectorFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  const { data: genresData, refetch: refetchGenres, loading } = useQuery(GET_GENRES);
  const [createGenre, { loading: isCreatingGenre }] = useMutation(CREATE_GENRE);

  // Filter genres based on search term and limit to 20
  const filteredGenres = useMemo(() => {
    if (!genresData?.genres) return [];
    
    const filtered = genresData.genres.filter(genre =>
      genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.slice(0, 20);
  }, [genresData?.genres, searchTerm]);

  // Convert to autocomplete options
  const genreOptions: GenreOption[] = useMemo(
    () => filteredGenres.map((genre) => ({
      label: genre.name,
      value: genre.id,
    })),
    [filteredGenres],
  );

  // Add "Create" option if search term doesn't match any existing genre
  const options = useMemo(() => {
    const existingGenre = genresData?.genres?.find(
      genre => genre.name.toLowerCase() === searchTerm.toLowerCase()
    );
    
    if (!existingGenre && searchTerm.trim()) {
      return [
        ...genreOptions,
        {
          value: `CREATE:${searchTerm}`,
          label: `Create "${searchTerm}"`,
        },
      ];
    }
    
    return genreOptions;
  }, [genreOptions, searchTerm, genresData?.genres]);

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const debouncedHandleSearch = useDebouncer(handleSearchChange, { wait: 300 });

  const handleCreateGenre = async (genreName: string) => {
    if (!genreName.trim()) return;
    
    try {
      const result = await createGenre({
        variables: {
          input: {
            name: genreName.trim()
          }
        }
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
      after={(loading || isCreatingGenre) ? <Loading size="xs" /> : undefined}
      clearable
    />
  );
};