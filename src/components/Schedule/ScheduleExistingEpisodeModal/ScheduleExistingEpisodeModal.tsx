'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAbsolute } from '@internationalized/date';
import {
  Button,
  DatePicker,
  Dialog,
  Loading,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@soundwaves/components';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScheduleQuery } from '@/graphql/__generated__/graphql';
import { CREATE_SCHEDULE_ITEM } from '@/graphql/mutations/createScheduleItem';
import { GET_SCHEDULE } from '@/graphql/queries/schedule';
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
});

export const ScheduleExistingEpisodeModal = ({
  scheduleDate,
  networkId,
  open,
  onOpenChange,
}: ScheduleExistingEpisodeProps) => {
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
  const [selectedEpisode, setSelectedEpisode] = useState<
    ScheduleQuery['schedule']['items'][0]['episode'] | null
  >(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      episode: '',
      start: scheduleDate,
      end: scheduleDate,
    },
    resolver: zodResolver(schema),
  });

  const handleSave = (values: z.infer<typeof schema>) => {
    if (!selectedEpisode) {
      toast('Please select an episode', 'error');
      return;
    }

    createScheduleItem({
      variables: {
        input: {
          episode: selectedEpisode.id,
          start: values.start.toISOString(),
          end: values.end.toISOString(),
          networks: [networkId],
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
    setSelectedEpisode(null);
    onOpenChange(false);
  };

  const handleEpisodeSelect = (episodeId: string) => {
    setValue('episode', episodeId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content dismissable>
        <Dialog.Title>Schedule an existing episode</Dialog.Title>
        <div className="flex flex--column">
          <Select label="Episode">
            <SelectTrigger>
              <SelectValue placeholder="Select episode" />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option-1">Option 1</SelectItem>
              <SelectItem value="option-2">Option 2</SelectItem>
              <SelectItem value="option-3">Option 3</SelectItem>
            </SelectContent>
          </Select>

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
