import { RadioGroup, RadioGroupProps } from '@soundwaves/components';
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface RadioGroupFieldProps<T extends FieldValues> extends RadioGroupProps {
  name: Path<T>;
  label: string;
  options: Array<{ label: string; value: string }>;
}

export const RadioGroupField = <T extends FieldValues>({
  name,
  label,
  options,
}: RadioGroupFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <RadioGroup
      label={label}
      value={value}
      onChange={onChange}
      helperText={error?.message}
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};
