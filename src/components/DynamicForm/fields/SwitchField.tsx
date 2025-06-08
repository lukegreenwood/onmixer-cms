import { Switch, SwitchProps } from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

type SwitchFieldProps<T extends FieldValues> = SwitchProps & {
  name: Path<T>;
  label: string;
};

export const SwitchField = <T extends FieldValues>({
  name,
  label,
}: SwitchFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <Switch
      label={label}
      checked={Boolean(value)}
      onChange={onChange}
      helperText={error?.message}
    />
  );
};
