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
}: CheckboxFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <Checkbox
      label={label}
      checked={Boolean(value)}
      onChange={onChange}
      helperText={error?.message}
    />
  );
};
