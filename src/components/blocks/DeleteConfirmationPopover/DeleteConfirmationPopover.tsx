'use client';

import { Button, Input, Popover } from '@soundwaves/components';
import { useState } from 'react';

import { WarningIcon } from '@/components/icons';

interface DeleteConfirmationPopoverPropsNameConfirmation {
  children: React.ReactNode;
  entityName: string;
  entityType: string;
  onConfirm: () => void;
  disabled?: boolean;
  entityNameConfirmation?: true;
}

type DeleteConfirmationPopoverPropsNoNameConfirmation = {
  children: React.ReactNode;
  entityName?: never;
  entityType: string;
  onConfirm: () => void;
  disabled?: boolean;
  entityNameConfirmation: false;
};

export const DeleteConfirmationPopover = ({
  children,
  entityName,
  entityType,
  onConfirm,
  disabled = false,
  entityNameConfirmation = true,
}:
  | DeleteConfirmationPopoverPropsNameConfirmation
  | DeleteConfirmationPopoverPropsNoNameConfirmation) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const isMatch = entityNameConfirmation
    ? inputValue.trim() === entityName?.trim()
    : true;

  const handleConfirm = () => {
    if (isMatch) {
      setOpen(false);
      setInputValue('');
      setIsTyping(false);
      onConfirm();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setInputValue('');
    setIsTyping(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content
        align="end"
        side="bottom"
        className="delete-confirmation-popover"
        style={{ zIndex: 1000 }}
      >
        <div className="delete-confirmation-popover__content">
          <div className="delete-confirmation-popover__header">
            <WarningIcon />
            <h3>Delete {entityType}</h3>
          </div>
          <p className="delete-confirmation-popover__description">
            This action cannot be undone.{' '}
            {entityNameConfirmation
              ? 'To confirm, type the ' +
                entityType.toLowerCase() +
                ' name &quot;' +
                entityName +
                '&quot; exactly as it appears:'
              : ''}
          </p>
          {entityNameConfirmation && (
            <Input
              placeholder={`Type ${entityType.toLowerCase()} name here...`}
              value={inputValue}
              onChange={(event) =>
                handleInputChange((event.target as HTMLInputElement).value)
              }
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  handleCancel();
                }
              }}
              autoFocus
            />
          )}
          <div className="delete-confirmation-popover__actions">
            <Button variant="tertiary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              destructive
              onClick={handleConfirm}
              disabled={
                entityNameConfirmation ? !isMatch || disabled : disabled
              }
            >
              Continue
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
};
