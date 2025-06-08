# Dynamic Form Component

The DynamicForm component is a flexible form builder that takes an array of field configurations and renders appropriate form controls dynamically. It uses React Hook Form's FormProvider for form state management and validation.

## Features

- Type-safe field configurations with discriminated unions
- Built-in support for various form controls:
  - Text inputs
  - Textareas
  - Multi-select controls
  - Checkboxes
  - Checkbox groups
  - Switches
  - Date pickers
  - Radio groups
- Form state management through React Hook Form's FormProvider
- Error handling and validation support
- Extensible field types

## Usage

The component requires a fields array that defines the form structure. The form state and submission handling should be managed by the parent component using React Hook Form's `useForm` and `FormProvider`.

### Basic Example

```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { DynamicForm, type DynamicFormField } from './DynamicForm';

interface FormData {
  shortName: string;
  description: string;
  networks: string[];
  isActive: boolean;
  preferences: string[];
  darkMode: boolean;
  birthDate: Date;
  role: string;
}

const fields: DynamicFormField<FormData>[] = [
  {
    component: 'text',
    name: 'shortName',
    label: 'Short Name',
    placeholder: 'Enter a short name',
    maxLength: 50,
  },
  {
    component: 'textarea',
    name: 'description',
    label: 'Description',
    placeholder: 'Enter a description',
    maxLength: 500,
  },
  {
    component: 'multiselect',
    name: 'networks',
    label: 'Networks',
    options: [
      { label: 'Network 1', value: 'net1' },
      { label: 'Network 2', value: 'net2' },
    ],
    searchable: true,
    clearable: true,
  },
  {
    component: 'checkbox',
    name: 'isActive',
    label: 'Active',
  },
  {
    component: 'checkboxGroup',
    name: 'preferences',
    label: 'Preferences',
    options: [
      { label: 'Email notifications', value: 'email' },
      { label: 'SMS notifications', value: 'sms' },
    ],
  },
  {
    component: 'switch',
    name: 'darkMode',
    label: 'Dark Mode',
  },
  {
    component: 'date',
    name: 'birthDate',
    label: 'Birth Date',
  },
  {
    component: 'radioGroup',
    name: 'role',
    label: 'Role',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
];

const MyForm = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      shortName: '',
      description: '',
      networks: [],
      isActive: false,
      preferences: [],
      darkMode: false,
      birthDate: new Date(),
      role: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DynamicForm fields={fields} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};
```

## Field Types

### Text Field

```tsx
interface TextFieldConfig<T> {
  component: 'text';
  name: Path<T>;
  label: string;
  placeholder?: string;
  maxLength?: number;
}
```

### Textarea Field

```tsx
interface TextareaFieldConfig<T> {
  component: 'textarea';
  name: Path<T>;
  label: string;
  placeholder?: string;
  maxLength?: number;
}
```

### Multi-Select Field

```tsx
interface MultiSelectFieldConfig<T> {
  component: 'multiselect';
  name: Path<T>;
  label: string;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
}
```

### Checkbox Field

```tsx
interface CheckboxFieldConfig<T> {
  component: 'checkbox';
  name: Path<T>;
  label: string;
}
```

### Checkbox Group Field

```tsx
interface CheckboxGroupFieldConfig<T> {
  component: 'checkboxGroup';
  name: Path<T>;
  label: string;
  options: Array<{ label: string; value: string }>;
}
```

### Switch Field

```tsx
interface SwitchFieldConfig<T> {
  component: 'switch';
  name: Path<T>;
  label: string;
}
```

### Date Field

```tsx
interface DateFieldConfig<T> {
  component: 'date';
  name: Path<T>;
  label: string;
}
```

### Radio Group Field

```tsx
interface RadioGroupFieldConfig<T> {
  component: 'radioGroup';
  name: Path<T>;
  label: string;
  options: Array<{ label: string; value: string }>;
}
```

## Form Context

The component uses React Hook Form's `FormProvider` and `useFormContext` for form state management. This means:

1. The parent component must wrap DynamicForm with `FormProvider`
2. The parent component controls form state and submission
3. Field components can access form methods through `useFormContext`
4. Multiple DynamicForm components can share the same form context

## Error Handling

The component displays error messages using the `helperText` prop. Error handling is managed through React Hook Form's validation system.
