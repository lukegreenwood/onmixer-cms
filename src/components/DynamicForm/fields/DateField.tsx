import {
  createCalendar,
  DateField as SoundwavesDateField,
  DateFieldProps as SoundwavesDateFieldProps,
} from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface DateFieldProps<T extends FieldValues>
  extends SoundwavesDateFieldProps {
  name: Path<T>;
  label: string;
}

export const DateField = <T extends FieldValues>({
  name,
  label,
  ...rest
}: DateFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <SoundwavesDateField
      {...rest}
      locale="en-GB"
      createCalendar={createCalendar}
      label={label}
      value={value}
      onChange={onChange}
      errorMessage={error?.message}
    />
  );
};
