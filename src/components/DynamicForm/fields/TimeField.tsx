import { TimeField as SoundwavesTimeField } from '@soundwaves/components';
import { format, parse } from 'date-fns';
import { useController, type FieldValues, type Path } from 'react-hook-form';

interface TimeFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  helperText?: string;
  locale?: string;
  _required?: boolean;
}

export const TimeField = <T extends FieldValues>({
  name,
  label,
  helperText,
  locale = 'en-GB',
  ...restProps
}: TimeFieldProps<T>) => {
  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  // Handle different input value types
  const timeValue = (() => {
    if (!value) return '';

    // If it's already a formatted time string (HH:mm:ss or HH:mm), return it
    if (typeof value === 'string' && /^\d{1,2}:\d{2}(:\d{2})?$/.test(value)) {
      return value;
    }

    // If it's a Date object, format it
    if (typeof value === 'object' && (value as unknown) instanceof Date) {
      return format(value as Date, 'HH:mm:ss');
    }

    // If it's a string that might be a date/time, try to parse it
    if (typeof value === 'string') {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return format(date, 'HH:mm:ss');
        }
      } catch {
        // If parsing fails, return the string as-is
        return value;
      }
    }

    return '';
  })();

  const handleTimeChange = (newTimeValue: string | null) => {
    if (!newTimeValue) {
      onChange('');
      return;
    }

    // For time-only fields, we might want to store just the time string
    // or create a Date object with today's date but the specified time
    const currentDate = new Date();

    try {
      // Try parsing as HH:mm:ss first, then HH:mm
      let parsedTime;
      if (newTimeValue.includes(':')) {
        const parts = newTimeValue.split(':');
        if (parts.length === 3) {
          parsedTime = parse(newTimeValue, 'HH:mm:ss', currentDate);
        } else if (parts.length === 2) {
          parsedTime = parse(newTimeValue, 'HH:mm', currentDate);
        }
      }

      if (parsedTime && !isNaN(parsedTime.getTime())) {
        // Store as time string for consistency
        onChange(format(parsedTime, 'HH:mm:ss'));
      } else {
        // Fallback to storing the raw string
        onChange(newTimeValue);
      }
    } catch {
      // If parsing fails, store the raw string
      onChange(newTimeValue);
    }
  };

  return (
    <SoundwavesTimeField
      {...rest}
      {...restProps}
      label={label}
      value={timeValue}
      onChange={handleTimeChange}
      locale={locale}
      errorMessage={error?.message ?? helperText}
    />
  );
};
