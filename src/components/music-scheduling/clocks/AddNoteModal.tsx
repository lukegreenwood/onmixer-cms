'use client';

import { Button, Dialog, Input, Textarea } from '@soundwaves/components';
import { useForm } from 'react-hook-form';

interface AddNoteFormData {
  label: string;
  content: string;
}

interface AddNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (label: string, content: string) => void;
  initialLabel?: string;
  initialContent?: string;
}

export const AddNoteModal = ({
  open,
  onOpenChange,
  onSubmit,
  initialLabel,
  initialContent,
}: AddNoteModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNoteFormData>({
    defaultValues: {
      label: '',
      content: '',
    },
    values: {
      label: initialLabel || '',
      content: initialContent || '',
    },
  });

  const onFormSubmit = (data: AddNoteFormData) => {
    onSubmit(data.label, data.content);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Overlay />
      <Dialog.Content className="add-note-modal">
        <Dialog.Title>
          {initialLabel ? 'Edit Note' : 'Add Note Below'}
        </Dialog.Title>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="add-note-modal__content">
            <Input
              label="Label"
              {...register('label', { required: 'Label is required' })}
              placeholder="Enter note label"
              helperText={errors.label?.message}
            />
            <Textarea
              label="Content"
              {...register('content')}
              placeholder="Enter note content"
              rows={3}
              helperText={errors.content?.message}
            />
          </div>

          <div className="add-note-modal__actions">
            <Button variant="tertiary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {initialLabel ? 'Update Note' : 'Add Note'}
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};
