import { Checkbox, CheckboxElementProps } from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface CheckboxFieldProps<T extends FieldValues>
  extends CheckboxElementProps {
  name: Path<T>;
  label: string;
}

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  ...rest
}: CheckboxFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <Checkbox
      {...rest}
      label={label}
      checked={Boolean(value)}
      onCheckedChange={onChange}
      helperText={error?.message}
    />
  );
};
