'use client';

import { Button, Dialog, Input } from '@soundwaves/components';
import { useState } from 'react';

interface AddCommercialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (duration: number, scheduledStartTime?: string) => void;
}

export const AddCommercialModal = ({
  open,
  onOpenChange,
  onSubmit,
}: AddCommercialModalProps) => {
  const [duration, setDuration] = useState(30);
  const [scheduledStartTime, setScheduledStartTime] = useState('');

  const handleSubmit = () => {
    onSubmit(duration, scheduledStartTime || undefined);
    setDuration(30);
    setScheduledStartTime('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setDuration(30);
    setScheduledStartTime('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content className="add-commercial-modal">
        <Dialog.Title>Add Commercial Below</Dialog.Title>
        
        <div className="add-commercial-modal__content">
          <Input
            label="Duration (seconds)"
            type="number"
            value={duration.toString()}
            onChange={(e) => setDuration(parseInt((e.target as HTMLInputElement).value) || 30)}
            placeholder="30"
            min={1}
          />
          <Input
            label="Scheduled Start Time (optional)"
            type="time"
            value={scheduledStartTime}
            onChange={(e) => setScheduledStartTime((e.target as HTMLInputElement).value)}
            placeholder="HH:MM"
          />
        </div>
        
        <div className="add-commercial-modal__actions">
          <Button variant="tertiary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Commercial
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};