'use client';

import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAbsolute } from '@internationalized/date';
import {
  Autocomplete,
  Badge,
  Button,
  DatePicker,
  Dialog,
  Loading,
  MultiSelect,
  Tag,
} from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PrimarySecondary } from '@/components';
import {
  EpisodeFilterField,
  FilterType,
  OperatorType,
} from '@/graphql/__generated__/graphql';
import { CREATE_SCHEDULE_ITEM } from '@/graphql/mutations/createScheduleItem';
import { SEARCH_EPISODES } from '@/graphql/queries/episodes';
import { GET_NETWORKS } from '@/graphql/queries/networks';
import { GET_SCHEDULE } from '@/graphql/queries/schedule';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib';

export type ScheduleExistingEpisodeProps = {
  scheduleDate: Date;
  networkId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const schema = z.object({
  episode: z.string().min(1, 'Episode is required'),
  start: z.date(),
  end: z.date(),
  networks: z.array(z.string()),
});

export const ScheduleExistingEpisodeModal = ({
  scheduleDate,
  networkId,
  open,
  onOpenChange,
}: ScheduleExistingEpisodeProps) => {
  const { currentNetwork } = useNetwork();
  const [createScheduleItem, { loading }] = useMutation(CREATE_SCHEDULE_ITEM, {
    refetchQueries: [
      {
        query: GET_SCHEDULE,
        variables: {
          from: scheduleDate.toISOString(),
          network: networkId,
        },
      },
    ],
  });

  const defaultFilters = useMemo(() => {
    return {
      filter: [
        {
          field: EpisodeFilterField.Networks,
          value: currentNetwork?.id ?? '',
          type: FilterType.List,
        },
      ],
    };
  }, [currentNetwork]);

  const {
    data,
    loading: loadingEpisodes,
    refetch,
  } = useQuery(SEARCH_EPISODES, {
    variables: {
      filters: defaultFilters,
    },
  });
  const { data: networksData } = useQuery(GET_NETWORKS);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      episode: '',
      start: scheduleDate,
      end: scheduleDate,
      networks: [networkId],
    },
    resolver: zodResolver(schema),
  });

  const handleSave = (values: z.infer<typeof schema>) => {
    createScheduleItem({
      variables: {
        input: {
          episode: values.episode,
          start: values.start.toISOString(),
          end: values.end.toISOString(),
          networks: values.networks,
        },
      },
      onCompleted: () => {
        toast('Episode scheduled successfully', 'success');
        onOpenChange(false);
      },
      onError: (error) => {
        toast('There was an error scheduling the episode', 'error');
        console.error(error);
      },
    });
  };

  const handleInvalid = () => {
    toast('There were issues scheduling the episode', 'error');
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
    refetch({
      filters: defaultFilters,
    });
  };

  const handleSearch = (value: string) => {
    refetch({
      filters: {
        filter: [
          {
            field: EpisodeFilterField.Networks,
            value: currentNetwork?.id ?? '',
            type: FilterType.List,
            operator: OperatorType.And,
          },
          {
            group: [
              {
                field: EpisodeFilterField.Name,
                value,
                type: FilterType.Contains,
              },
              {
                field: EpisodeFilterField.Id,
                value,
                type: FilterType.Equal,
              },
            ],
            operator: OperatorType.Or,
          },
        ],
      },
    });
  };

  const debouncedHandleSearch = useDebouncer(handleSearch, { wait: 500 });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content dismissable>
        <Dialog.Title>Schedule an existing episode</Dialog.Title>
        <div className="flex flex--column form">
          <Controller
            control={control}
            name="episode"
            render={({ field, fieldState }) => {
              return (
                <Autocomplete
                  label="Episode"
                  {...field}
                  options={
                    data?.episodes.items.map((episode) => episode.id) ?? []
                  }
                  destructive={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  onSearch={(value) => {
                    debouncedHandleSearch.maybeExecute(value);
                  }}
                  after={loadingEpisodes ? <Loading size="xxs" /> : undefined}
                  initialOpen
                  renderOption={(option) => {
                    const episode = data?.episodes.items.find(
                      (episode) => episode.id === option.value,
                    );
                    return (
                      <div className="flex flex--justify-between width-full">
                        <PrimarySecondary
                          secondary={episode?.show.shortName ?? ''}
                          primary={episode?.name ?? option.label}
                        />
                        <Badge color="orange" shape="pill" size="sm">
                          #{episode?.id ?? option.value}
                        </Badge>
                      </div>
                    );
                  }}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="start"
            render={({ field, fieldState }) => {
              const { onChange, value: currentValue, ...rest } = field;
              return (
                <DatePicker
                  label="Start"
                  {...rest}
                  value={parseAbsolute(currentValue.toISOString(), 'UTC')}
                  onChange={(value) => {
                    if (value) {
                      onChange(value.toDate('UTC'));
                    }
                  }}
                  errorMessage={fieldState.error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="end"
            render={({ field, fieldState }) => {
              const { onChange, value: currentValue, ...rest } = field;
              return (
                <DatePicker
                  label="End"
                  {...rest}
                  value={parseAbsolute(currentValue.toISOString(), 'UTC')}
                  onChange={(value) => {
                    if (value) {
                      onChange(value.toDate('UTC'));
                    }
                  }}
                  errorMessage={fieldState.error?.message}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="networks"
            render={({ field, fieldState }) => {
              return (
                <MultiSelect
                  label="Networks"
                  {...field}
                  options={
                    networksData?.networks.map((network) => ({
                      label: network.name,
                      value: network.id,
                    })) ?? []
                  }
                  destructive={Boolean(fieldState.error)}
                  helperText={
                    fieldState.error?.message ??
                    'Defaults to the active network'
                  }
                  renderTag={(option) => {
                    const matchingNetwork = networksData?.networks.find(
                      (network) => network.id === option.item.value,
                    );
                    return (
                      <Tag
                        size="sm"
                        before={
                          <div
                            className="network-icon network-icon--sm"
                            dangerouslySetInnerHTML={{
                              __html: matchingNetwork?.logoSvgIcon ?? '',
                            }}
                          />
                        }
                        closable
                        onClose={option.onRemove}
                      >
                        {option.item.label}
                      </Tag>
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
              Schedule
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
