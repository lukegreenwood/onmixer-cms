'use client';

import { Button, Dialog, Input, Textarea } from '@soundwaves/components';
import { useState } from 'react';

interface AddNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (label: string, content: string) => void;
}

export const AddNoteModal = ({
  open,
  onOpenChange,
  onSubmit,
}: AddNoteModalProps) => {
  const [label, setLabel] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (label.trim()) {
      onSubmit(label, content);
      setLabel('');
      setContent('');
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setLabel('');
    setContent('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content className="add-note-modal">
        <Dialog.Title>Add Note Below</Dialog.Title>
        
        <div className="add-note-modal__content">
          <Input
            label="Label"
            value={label}
            onChange={(e) => setLabel((e.target as HTMLInputElement).value)}
            placeholder="Enter note label"
          />
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent((e.target as HTMLTextAreaElement).value)}
            placeholder="Enter note content"
            rows={3}
          />
        </div>
        
        <div className="add-note-modal__actions">
          <Button variant="tertiary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!label.trim()}
          >
            Add Note
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};