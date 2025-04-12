'use client';

import { useMutation } from '@apollo/client';
import { utc } from '@date-fns/utc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Loading, TimeField } from '@soundwaves/components';
import { format, parse } from 'date-fns';
import { useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScheduleQuery } from '@/graphql/__generated__/graphql';
import { CREATE_SCHEDULE_ITEM } from '@/graphql/mutations/createScheduleItem';
import { GET_SCHEDULE } from '@/graphql/queries/schedule';
import { toast } from '@/lib';

import { EpisodeSelector } from '../../Episode/EpisodeSelector/EpisodeSelector';

export type ScheduleExistingEpisodeProps = {
  trigger: React.ReactNode;
  scheduleDate: Date;
  networkId: string;
};

const schema = z.object({
  episode: z.string().min(1, 'Episode is required'),
  start: z.date(),
  end: z.date(),
});

export const ScheduleExistingEpisodeModal = ({
  trigger,
  scheduleDate,
  networkId,
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
  const [open, setOpen] = useState(false);
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
  const id = useId();

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
        setOpen(false);
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
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleEpisodeSelect = (episodeId: string) => {
    setValue('episode', episodeId);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Content dismissable>
        <Dialog.Title>Schedule an existing episode</Dialog.Title>
        <div className="schedule-item-editor">
          <div className="schedule-item-editor__row">
            <p className="schedule-item-editor__row-label">Episode</p>
            {/* <EpisodeSelector
              episode={selectedEpisode}
              onSelect={handleEpisodeSelect}
            /> */}
          </div>
          <div className="schedule-item-editor__row">
            <p
              className="schedule-item-editor__row-label"
              id={`${id}-start-label`}
            >
              Start
            </p>
            <Controller
              control={control}
              name="start"
              render={({ field, fieldState }) => {
                const { onChange, value: currentValue, ...rest } = field;
                return (
                  <TimeField
                    aria-labelledby={`${id}-start-label`}
                    locale="en-GB"
                    {...rest}
                    value={format(currentValue, 'HH:mm:ss', { in: utc })}
                    onChange={(value) => {
                      if (value) {
                        const newDate = parse(value, 'HH:mm:ss', currentValue, {
                          in: utc,
                        });
                        onChange(newDate);
                      }
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          </div>
          <div className="schedule-item-editor__row">
            <p
              className="schedule-item-editor__row-label"
              id={`${id}-end-label`}
            >
              End
            </p>
            <Controller
              control={control}
              name="end"
              render={({ field, fieldState }) => {
                const { onChange, value: currentValue, ...rest } = field;
                return (
                  <TimeField
                    aria-labelledby={`${id}-end-label`}
                    locale="en-GB"
                    {...rest}
                    value={format(currentValue, 'HH:mm:ss', { in: utc })}
                    onChange={(value) => {
                      if (value) {
                        const newDate = parse(value, 'HH:mm:ss', currentValue, {
                          in: utc,
                        });
                        onChange(newDate);
                      }
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="dialog-footer">
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
      </Dialog.Content>
    </Dialog>
  );
};
