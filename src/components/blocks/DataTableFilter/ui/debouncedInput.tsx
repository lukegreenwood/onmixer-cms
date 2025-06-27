import { Input, InputProps } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useEffect, useState } from 'react';

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounceMs = 500, // This is the wait time, not the function
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounceMs?: number;
} & Omit<InputProps, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  // Sync with initialValue when it changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Define the debounced function with useCallback
  const debouncedOnChange = useDebouncer(onChange, { wait: debounceMs });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLLabelElement>,
  ) => {
    const newValue = (e.target as HTMLInputElement).value;
    setValue(newValue); // Update local state immediately
    debouncedOnChange.maybeExecute(newValue); // Call debounced version
  };

  return <Input {...props} value={value} onChange={handleChange} />;
}
