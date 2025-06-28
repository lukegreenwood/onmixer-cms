import { Textarea, TextareaProps } from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface TextareaFieldProps<T extends FieldValues> extends TextareaProps {
  name: Path<T>;
  label: string;
  placeholder?: string;
  maxLength?: number;
}

export const TextareaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  maxLength,
  ...rest
}: TextareaFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  const stringValue = typeof value === 'string' ? value : '';

  return (
    <Textarea
      {...rest}
      label={label}
      value={stringValue}
      onChange={onChange}
      helperText={error?.message}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
};
