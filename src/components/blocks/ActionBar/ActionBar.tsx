import clsx from 'clsx';
import { ReactNode } from 'react';

import { WarningIcon } from '@/icons';

export interface ActionBarProps {
  visible?: boolean;
  children: ReactNode;
  className?: string;
  unsavedChanges?: boolean;
}

export const ActionBar = ({
  children,
  className,
  unsavedChanges,
}: ActionBarProps) => {
  return (
    <div className={clsx('action-bar', className)}>
      {unsavedChanges && (
        <div className="action-bar__warning">
          <WarningIcon className="action-bar__warning-icon" />
          Unsaved changes
        </div>
      )}
      <div className="action-bar__actions">{children}</div>
    </div>
  );
};
