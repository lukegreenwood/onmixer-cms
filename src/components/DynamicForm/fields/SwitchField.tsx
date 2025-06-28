import { Switch, SwitchProps } from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

type SwitchFieldProps<T extends FieldValues> = SwitchProps & {
  name: Path<T>;
  label: string;
};

export const SwitchField = <T extends FieldValues>({
  name,
  label,
  ...rest
}: SwitchFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <Switch
      {...rest}
      label={label}
      checked={Boolean(value)}
      onChange={onChange}
      helperText={error?.message ?? rest.helperText}
    />
  );
};
