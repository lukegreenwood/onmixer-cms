'use client';

import { Button, Dialog } from '@soundwaves/components';

import { WarningIcon } from '@/components/icons';

interface DeletePresenterConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presenterName: string;
  totalShows: number;
  totalEpisodes: number;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeletePresenterConfirmationModal = ({
  open,
  onOpenChange,
  presenterName,
  totalShows,
  totalEpisodes,
  onConfirm,
  isDeleting = false,
}: DeletePresenterConfirmationModalProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content className="delete-presenter-confirmation-modal">
        <div className="delete-presenter-confirmation-modal__header">
          <WarningIcon />
          <Dialog.Title>Final Confirmation</Dialog.Title>
        </div>
        <Dialog.Description>
          <div className="delete-presenter-confirmation-modal__content">
            <p>
              You are about to permanently delete the presenter{' '}
              <strong>&ldquo;{presenterName}&rdquo;</strong>.
            </p>
            {(totalShows > 0 || totalEpisodes > 0) && (
              <div className="delete-presenter-confirmation-modal__warning">
                <WarningIcon />
                <div>
                  <p>
                    <strong>
                      This presenter is associated with {totalShows} show
                      {totalShows !== 1 ? 's' : ''}
                      {totalEpisodes > 0 &&
                        ` and ${totalEpisodes} episode${
                          totalEpisodes !== 1 ? 's' : ''
                        }`}
                      .
                    </strong>
                  </p>
                  <p>
                    The presenter will be removed from all shows and episodes
                    they are currently associated with.
                  </p>
                </div>
              </div>
            )}
            <p>
              This action cannot be undone. Are you absolutely sure you want to
              continue?
            </p>
          </div>
        </Dialog.Description>
        <div className="delete-presenter-confirmation-modal__actions">
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
            {isDeleting ? 'Deleting...' : 'Delete Presenter'}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
