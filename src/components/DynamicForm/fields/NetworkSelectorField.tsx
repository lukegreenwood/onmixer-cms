import { useQuery } from '@apollo/client';
import { MultiSelect, Tag } from '@soundwaves/components';
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
}

export const NetworkSelectorField = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Select networks...',
  className = '',
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

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      className={className}
      value={value || []}
      onChange={onChange}
      options={options}
      destructive={Boolean(error)}
      helperText={error?.message}
      selectedItemsOutside
      renderTag={(option) => {
        const network = data?.networks.find((n) => n.id === option.item.value);
        return (
          <div key={option.item.value}>
            <Tag
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
          </div>
        );
      }}
    />
  );
};
