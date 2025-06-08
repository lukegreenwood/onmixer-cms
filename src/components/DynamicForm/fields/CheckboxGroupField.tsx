import { CheckboxGroup, CheckboxGroupProps } from '@soundwaves/components';
import {
  PathValue,
  useController,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface CheckboxGroupFieldProps<T extends FieldValues>
  extends CheckboxGroupProps {
  name: Path<T>;
  label: string;
  options: Array<{ label: string; value: string }>;
}

export const CheckboxGroupField = <T extends FieldValues>({
  name,
  label,
  options,
}: CheckboxGroupFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  const arrayValue = Array.isArray(value) ? value : [];

  return (
    <CheckboxGroup
      label={label}
      onChange={onChange}
      helperText={error?.message}
    >
      {options.map((option) => (
        <CheckboxGroup.Item
          key={option.value}
          value={option.value}
          label={option.label}
          checked={arrayValue.includes(option.value as PathValue<T, Path<T>>)}
        />
      ))}
    </CheckboxGroup>
  );
};
