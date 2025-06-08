import {
  MultiSelect,
  MultiSelectProps,
  type MultiSelectOption,
} from '@soundwaves/components';
import {
  useFormContext,
  useController,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface MultiSelectFieldProps<T extends FieldValues>
  extends MultiSelectProps {
  name: Path<T>;
  label: string;
  options: MultiSelectOption[];
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
}

export const MultiSelectField = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  searchable,
  clearable,
  ...props
}: MultiSelectFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const arrayValue = Array.isArray(value) ? value : [];

  return (
    <MultiSelect
      {...props}
      label={label}
      value={arrayValue}
      onChange={onChange}
      helperText={error?.message}
      destructive={!!error}
      options={options}
      searchable={searchable}
      clearable={clearable}
      placeholder={placeholder}
    />
  );
};
