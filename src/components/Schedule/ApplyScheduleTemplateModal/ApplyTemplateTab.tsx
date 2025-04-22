import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Loading } from '@soundwaves/components';
import { Autocomplete } from '@soundwaves/components';
import { Badge } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  DefaultScheduleFilterField,
  FilterType,
  OperatorType,
} from '@/graphql/__generated__/graphql';
import { APPLY_DEFAULT_SCHEDULE } from '@/graphql/mutations/applyDefaultSchedule';
import { SEARCH_DEFAULT_SCHEDULE } from '@/graphql/queries';
import { toast } from '@/lib/toast';

const schema = z.object({
  defaultScheduleId: z
    .string()
    .min(1, 'At least one default schedule must be selected'),
  date: z.date(),
  networkId: z
    .array(z.string())
    .min(1, 'At least one network must be selected'),
});

export const ApplyTemplateTab = ({
  scheduleDate,
  networkId,
  onOpenChange,
}: {
  scheduleDate: Date;
  networkId: string;
  onOpenChange: (open: boolean) => void;
}) => {
  const [applyScheduleTemplate, { loading }] = useMutation(
    APPLY_DEFAULT_SCHEDULE,
    {
      refetchQueries: ['Schedule'],
      onCompleted: (data) => {
        if (data.applyAssignedDefaultSchedule.success) {
          toast('Schedule template applied successfully', 'success');
          onOpenChange(false);
        } else {
          toast(
            data.applyAssignedDefaultSchedule.message ||
              'Failed to apply schedule template',
            'error',
          );
        }
      },
      onError: (error) => {
        toast('There was an error applying the schedule template', 'error');
        console.error(error);
      },
    },
  );

  const {
    data: defaultSchedules,
    loading: loadingDefaultSchedules,
    refetch,
  } = useQuery(SEARCH_DEFAULT_SCHEDULE, {
    variables: {
      filters: {
        filter: [],
      },
    },
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      date: scheduleDate,
      networkId: [networkId],
    },
    resolver: zodResolver(schema),
  });

  const handleSearch = (value: string) => {
    refetch({
      filters: {
        filter: [
          {
            field: DefaultScheduleFilterField.Name,
            value,
            type: FilterType.Contains,
          },
          {
            field: DefaultScheduleFilterField.Id,
            value,
            type: FilterType.Equal,
            operator: OperatorType.Or,
          },
        ],
      },
    });
  };

  const debouncedHandleSearch = useDebouncer(handleSearch, { wait: 500 });

  const handleSave = (values: z.infer<typeof schema>) => {
    applyScheduleTemplate({
      variables: {
        date: values.date.toISOString(),
        defaultScheduleId: values.defaultScheduleId,
      },
    });
  };

  const handleInvalid = (errors: FieldErrors<z.infer<typeof schema>>) => {
    toast('There were issues applying the schedule template', 'error');
    console.log(errors);
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <div className="flex flex--column form">
      <Controller
        control={control}
        name="defaultScheduleId"
        render={({ field, fieldState }) => {
          return (
            <Autocomplete
              label="Schedule Template"
              {...field}
              options={
                defaultSchedules?.defaultSchedules.items.map(
                  (defaultSchedule) => defaultSchedule.id,
                ) ?? []
              }
              destructive={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              onSearch={(value) => {
                debouncedHandleSearch.maybeExecute(value);
              }}
              after={
                loadingDefaultSchedules ? <Loading size="xxs" /> : undefined
              }
              initialOpen
              renderOption={(option) => {
                const defaultSchedule =
                  defaultSchedules?.defaultSchedules.items.find(
                    (defaultSchedule) => defaultSchedule.id === option.value,
                  );
                return (
                  <div className="flex flex--justify-between width-full">
                    {defaultSchedule?.name}
                    <div className="flex flex--row flex--align-center">
                      {defaultSchedule?.networks?.map((network) => (
                        <Badge
                          color="blue"
                          shape="pill"
                          size="sm"
                          key={network.id}
                        >
                          {network.name}
                        </Badge>
                      ))}
                      <Badge color="orange" shape="pill" size="sm">
                        #{defaultSchedule?.id}
                      </Badge>
                    </div>
                  </div>
                );
              }}
            />
          );
        }}
      />
      <div className="flex flex--row flex--justify-end width-full">
        <Button variant="transparent" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleSubmit(handleSave, handleInvalid)()}
          after={loading ? <Loading size="xxs" /> : undefined}
          disabled={loading}
        >
          Apply Template
        </Button>
      </div>
    </div>
  );
};
