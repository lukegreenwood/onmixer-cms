import {
  Alert,
  CheckboxElementProps,
  CheckboxGroupProps,
  DateFieldProps,
  InputProps,
  MultiSelectProps,
  RadioGroupProps,
  SwitchProps,
  TextareaProps,
  type MultiSelectOption,
} from '@soundwaves/components';
import { type FieldValues, type Path } from 'react-hook-form';

import {
  TextField,
  MultiSelectField,
  CheckboxField,
  CheckboxGroupField,
  SwitchField,
  DateField,
  RadioGroupField,
  TextareaField,
} from './fields';

import type { ReactElement } from 'react';

interface BaseField<T extends FieldValues> {
  label: string;
  name: Path<T>;
}

interface TextFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<InputProps, 'label' | 'name'> {
  component: 'text';
  placeholder?: string;
  maxLength?: number;
}

interface MultiSelectFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<MultiSelectProps, 'label' | 'name'> {
  component: 'multiselect';
  options: MultiSelectOption[];
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
}

interface TextareaFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<TextareaProps, 'label' | 'name'> {
  component: 'textarea';
  placeholder?: string;
  maxLength?: number;
}

interface CheckboxFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<CheckboxElementProps, 'label' | 'name'> {
  component: 'checkbox';
}

interface CheckboxGroupFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<CheckboxGroupProps, 'label' | 'name'> {
  component: 'checkboxGroup';
  options: Array<{ label: string; value: string }>;
}

interface SwitchFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<SwitchProps, 'label' | 'name'> {
  component: 'switch';
}

interface DateFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<DateFieldProps, 'label' | 'name'> {
  component: 'date';
}

interface RadioGroupFieldConfig<T extends FieldValues>
  extends BaseField<T>,
    Omit<RadioGroupProps, 'label' | 'name'> {
  component: 'radioGroup';
  options: Array<{ label: string; value: string }>;
}

export type DynamicFormField<T extends FieldValues> =
  | TextFieldConfig<T>
  | TextareaFieldConfig<T>
  | MultiSelectFieldConfig<T>
  | CheckboxFieldConfig<T>
  | CheckboxGroupFieldConfig<T>
  | SwitchFieldConfig<T>
  | DateFieldConfig<T>
  | RadioGroupFieldConfig<T>;

interface DynamicFormProps<T extends FieldValues> {
  fields: DynamicFormField<T>[];
  className?: string;
}

export const DynamicForm = <T extends FieldValues>({
  fields,
  className = '',
}: DynamicFormProps<T>): ReactElement => {
  const renderField = (field: DynamicFormField<T>): ReactElement => {
    const { component, name, label } = field;

    switch (component) {
      case 'text': {
        const { ...rest } = field;
        return <TextField {...rest} key={name} name={name} label={label} />;
      }
      case 'textarea': {
        const { ...rest } = field;
        return <TextareaField {...rest} key={name} name={name} label={label} />;
      }
      case 'multiselect': {
        const { ...rest } = field;
        return (
          <MultiSelectField {...rest} key={name} name={name} label={label} />
        );
      }
      case 'checkbox': {
        const { ...rest } = field;
        return <CheckboxField {...rest} key={name} name={name} label={label} />;
      }
      case 'checkboxGroup': {
        const { ...rest } = field;
        return (
          <CheckboxGroupField {...rest} key={name} name={name} label={label} />
        );
      }
      case 'switch': {
        const { ...rest } = field;
        return <SwitchField {...rest} key={name} name={name} label={label} />;
      }
      case 'date': {
        const { ...rest } = field;
        return <DateField {...rest} key={name} name={name} label={label} />;
      }
      case 'radioGroup': {
        const { ...rest } = field;
        return (
          <RadioGroupField {...rest} key={name} name={name} label={label} />
        );
      }
      default:
        return (
          <Alert color="error" variant="inline">
            Unsupported field type &quot;{component}&quot;
          </Alert>
        );
    }
  };

  return <div className={className}>{fields.map(renderField)}</div>;
};
