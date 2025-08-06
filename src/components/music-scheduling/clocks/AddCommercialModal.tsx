'use client';

import { Button, Dialog, Input } from '@soundwaves/components';
import { useForm } from 'react-hook-form';

import {
  formatTimeForDisplay,
  formatTimeForBackend,
  isValidMmSsFormat,
} from './utils/timeFormatting';

interface AddCommercialFormData {
  duration: number;
  scheduledStartTime: string;
}

interface AddCommercialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (duration: number, scheduledStartTime?: string) => void;
  initialDuration?: number;
  initialScheduledStartTime?: string;
}

export const AddCommercialModal = ({
  open,
  onOpenChange,
  onSubmit,
  initialDuration,
  initialScheduledStartTime,
}: AddCommercialModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommercialFormData>({
    defaultValues: {
      duration: 30,
      scheduledStartTime: '',
    },
    values: {
      duration: initialDuration || 30,
      scheduledStartTime: formatTimeForDisplay(initialScheduledStartTime),
    },
  });

  const onFormSubmit = (data: AddCommercialFormData) => {
    const backendTime = data.scheduledStartTime
      ? formatTimeForBackend(data.scheduledStartTime)
      : undefined;
    onSubmit(data.duration, backendTime);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Overlay />
      <Dialog.Content className="add-commercial-modal">
        <Dialog.Title>
          {initialDuration ? 'Edit Commercial' : 'Add Commercial Below'}
        </Dialog.Title>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="add-commercial-modal__content">
            <Input
              label="Duration (seconds)"
              type="number"
              {...register('duration', {
                required: 'Duration is required',
                min: {
                  value: 1,
                  message: 'Duration must be at least 1 second',
                },
                valueAsNumber: true,
              })}
              placeholder="30"
              min={1}
              helperText={errors.duration?.message}
            />
            <Input
              label="Scheduled Start Time (optional)"
              {...register('scheduledStartTime', {
                validate: (value) =>
                  !value ||
                  isValidMmSsFormat(value) ||
                  'Please enter time in MM:SS format (e.g., 15:30)',
              })}
              placeholder="MM:SS (e.g., 15:30)"
              pattern="[0-5]?[0-9]:[0-5][0-9]"
              helperText={errors.scheduledStartTime?.message}
            />
          </div>

          <div className="add-commercial-modal__actions">
            <Button variant="tertiary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {initialDuration ? 'Update Commercial' : 'Add Commercial'}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};
