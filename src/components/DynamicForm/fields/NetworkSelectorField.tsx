import { useQuery } from '@apollo/client';
import { Autocomplete, MultiSelect, Tag } from '@soundwaves/components';
import { useMemo } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';

import { GET_NETWORKS } from '@/graphql/queries/networks';

type NetworkOption = {
  label: string;
  value: string;
};

interface NetworkSelectorFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
}

export const NetworkSelectorField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className = '',
  multiple = true,
}: NetworkSelectorFieldProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
  });

  const { data } = useQuery(GET_NETWORKS);

  // Convert API data to options
  const options: NetworkOption[] = useMemo(
    () =>
      data?.networks.map((network) => ({
        label: network.name,
        value: network.id,
      })) ?? [],
    [data?.networks],
  );

  // For single select mode, convert value to selected option
  const selectedOption = useMemo(() => {
    if (multiple || !value || Array.isArray(value)) return null;
    const network = data?.networks.find((n) => n.id === value);
    return network ? { label: network.name, value: network.id } : null;
  }, [value, multiple, data?.networks]);

  const handleSingleChange = (selectedId: string | null) => {
    onChange(selectedId);
  };

  if (multiple) {
    return (
      <MultiSelect
        label={label}
        placeholder={placeholder || 'Select networks...'}
        className={className}
        value={value || []}
        onChange={onChange}
        options={options}
        destructive={Boolean(error)}
        helperText={error?.message}
        selectedItemsOutside
        renderTag={(option) => {
          const network = data?.networks.find(
            (n) => n.id === option.item.value,
          );
          return (
            <Tag
              key={option.item.value}
              size="sm"
              before={
                network?.logoSvgIcon ? (
                  <div
                    className="network-icon network-icon--sm"
                    dangerouslySetInnerHTML={{
                      __html: network.logoSvgIcon,
                    }}
                  />
                ) : undefined
              }
              closable
              onClose={option.onRemove}
            >
              {network?.name || option.item.label}
            </Tag>
          );
        }}
      />
    );
  }

  return (
    <Autocomplete
      label={label}
      placeholder={placeholder || 'Select network...'}
      className={className}
      value={selectedOption?.value || undefined}
      onChange={handleSingleChange}
      options={options}
      destructive={Boolean(error)}
      helperText={error?.message}
      clearable
    />
  );
};
