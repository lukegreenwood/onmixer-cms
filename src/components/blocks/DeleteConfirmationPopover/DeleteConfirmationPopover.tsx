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
  open?: never;
  onOpenChange?: never;
}

type DeleteConfirmationPopoverPropsNoNameConfirmation = {
  children: React.ReactNode;
  entityName?: never;
  entityType: string;
  onConfirm: () => void;
  disabled?: boolean;
  entityNameConfirmation: false;
  open?: never;
  onOpenChange?: never;
};

type DeleteConfirmationPopoverPropsExternalOpen = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: never;
  entityName?: never;
  entityType: string;
  onConfirm: () => void;
  disabled?: boolean;
  entityNameConfirmation: false;
};

type DeleteConfirmationPopoverPropsExternalOpenWithName = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: never;
  entityName: string;
  entityType: string;
  onConfirm: () => void;
  disabled?: boolean;
  entityNameConfirmation: true;
};

export const DeleteConfirmationPopover = ({
  children,
  entityName,
  entityType,
  onConfirm,
  disabled = false,
  entityNameConfirmation = true,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}:
  | DeleteConfirmationPopoverPropsNameConfirmation
  | DeleteConfirmationPopoverPropsNoNameConfirmation
  | DeleteConfirmationPopoverPropsExternalOpen
  | DeleteConfirmationPopoverPropsExternalOpenWithName) => {
  const [open, setOpen] = useState(openProp || false);
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
      onOpenChangeProp?.(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setInputValue('');
    setIsTyping(false);
    onOpenChangeProp?.(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChangeProp?.(open);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      {children ? (
        <Popover.Trigger asChild disabled={disabled}>
          {children}
        </Popover.Trigger>
      ) : (
        <Popover.Anchor />
      )}
      <Popover.Portal>
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
                  ' name "' +
                  entityName +
                  '" exactly as it appears:'
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
      </Popover.Portal>
    </Popover>
  );
};
