'use client';

import { Button, Dialog, Input } from '@soundwaves/components';
import { useForm } from 'react-hook-form';

interface AddCommandFormData {
  command: string;
}

interface AddCommandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (command: string) => void;
  initialCommand?: string;
}

export const AddCommandModal = ({
  open,
  onOpenChange,
  onSubmit,
  initialCommand,
}: AddCommandModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommandFormData>({
    defaultValues: {
      command: '',
    },
    values: {
      command: initialCommand || '',
    },
  });

  const onFormSubmit = (data: AddCommandFormData) => {
    onSubmit(data.command);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Overlay />
      <Dialog.Content className="add-command-modal">
        <Dialog.Title>
          {initialCommand ? 'Edit Command' : 'Edit Command'}
        </Dialog.Title>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="add-command-modal__content">
            <Input
              label="Command"
              {...register('command', { required: 'Command is required' })}
              placeholder="e.g., FADE_IN, FADE_OUT"
              helperText={errors.command?.message}
            />
          </div>

          <div className="add-command-modal__actions">
            <Button variant="tertiary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {initialCommand ? 'Update Command' : 'Update Command'}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};