import clsx from 'clsx';

import { Card } from '../Card';

import type { ReactNode } from 'react';

export interface EntityEditFormProps {
  leftSection: ReactNode;
  rightSection: ReactNode;
  className?: string;
}

export const EntityEditForm = ({
  leftSection,
  rightSection,
  className = '',
}: EntityEditFormProps) => {
  return (
    <div className={clsx('entity-edit-form', className)}>
      <div className="entity-edit-form__content">
        <div className="entity-edit-form__left">
          <Card>{leftSection}</Card>
        </div>
        <div className="entity-edit-form__right">
          <Card>{rightSection}</Card>
        </div>
      </div>
    </div>
  );
};
