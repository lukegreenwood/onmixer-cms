'use client';

import { Button, Dialog } from '@soundwaves/components';

import { WarningIcon } from '@/components/icons';

interface DeleteShowConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showName: string;
  totalEpisodes: number;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeleteShowConfirmationModal = ({
  open,
  onOpenChange,
  showName,
  totalEpisodes,
  onConfirm,
  isDeleting = false,
}: DeleteShowConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content className="delete-show-confirmation-modal">
        <div className="delete-show-confirmation-modal__header">
          <WarningIcon />
          <Dialog.Title>Final Confirmation</Dialog.Title>
        </div>

        <div className="delete-show-confirmation-modal__content">
          <p>
            You are about to permanently delete the show{' '}
            <strong>&ldquo;{showName}&rdquo;</strong>.
          </p>
          <div className="delete-show-confirmation-modal__warning">
            <WarningIcon />
            <div>
              <p>
                <strong>
                  This action will also delete {totalEpisodes} associated
                  episodes.
                </strong>
              </p>
              <p>
                All episode data, including scheduling information will be
                permanently removed.
              </p>
            </div>
          </div>
          <p>
            This action cannot be undone. Are you absolutely sure you want to
            continue?
          </p>
        </div>
        <div className="delete-show-confirmation-modal__actions">
          <Button
            variant="tertiary"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            destructive
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Show & Episodes'}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
