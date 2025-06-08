import { Input, InputProps } from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  label: string;
  placeholder?: string;
  maxLength?: number;
}

export const TextField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  maxLength,
  ...props
}: TextFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  const stringValue = typeof value === 'string' ? value : '';

  return (
    <Input
      {...props}
      label={label}
      value={stringValue}
      onChange={onChange}
      helperText={error?.message}
      destructive={!!error}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};
