import { useQuery } from '@apollo/client';
import { Autocomplete, Loading } from '@soundwaves/components';
import { useMemo, useState } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import { GET_CATEGORIES } from '@/graphql/queries/categories';

type CategoryOption = {
  label: string;
  value: string;
  category: string;
};

interface CategorySelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
  required?: boolean;
}

// Custom component to render category and subcategory
interface PrimarySecondaryProps {
  primary: string;
  secondary: string;
}

function PrimarySecondary({ primary, secondary }: PrimarySecondaryProps) {
  return (
    <div className="primary-secondary">
      <div className="primary-secondary__primary">{primary}</div>
      <div className="primary-secondary__secondary">{secondary}</div>
    </div>
  );
}

export const CategorySelectorField = <T extends FieldValues>({
  name,
  label,
  helperText,
  placeholder = 'Select a category...',
  ...restProps
}: CategorySelectorFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  const { data: categoriesData, loading } = useQuery(GET_CATEGORIES);

  // Convert to autocomplete options
  const categoryOptions: CategoryOption[] = useMemo(() => {
    if (!categoriesData?.categories) return [];

    return categoriesData.categories.flatMap((category) =>
      category.subcategories.map((subcategory) => ({
        label: subcategory.name,
        value: subcategory.id,
        category: category.name,
      })),
    );
  }, [categoriesData?.categories]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return categoryOptions;

    const searchTermLower = searchTerm.toLowerCase();
    return categoryOptions.filter((option) => {
      return (
        option.label.toLowerCase().includes(searchTermLower) ||
        option.category.toLowerCase().includes(searchTermLower)
      );
    });
  }, [categoryOptions, searchTerm]);

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleSelectionChange = (selectedValue: string | null) => {
    onChange(selectedValue || '');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchTerm('');
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
      options={filteredOptions}
      onSearch={handleSearchChange}
      onOpenChange={handleOpenChange}
      renderOption={(option) => {
        const categoryOption = categoryOptions.find(
          (s) => s.value === option.value,
        );
        return categoryOption ? (
          <PrimarySecondary
            primary={categoryOption.label}
            secondary={categoryOption.category}
          />
        ) : (
          option.label
        );
      }}
      destructive={Boolean(error)}
      helperText={error?.message ?? helperText}
      after={loading ? <Loading size="xs" /> : undefined}
      clearable
    />
  );
};