import clsx from 'clsx';

import { Card } from '../Card';

import type { ReactNode } from 'react';

export interface EntityEditFormProps {
  startSection: ReactNode | ReactNode[];
  endSection: ReactNode | ReactNode[];
  className?: string;
}

export const EntityEditForm = ({
  startSection,
  endSection,
  className = '',
}: EntityEditFormProps) => {
  const startSectionContent = Array.isArray(startSection)
    ? startSection
    : [startSection];
  const endSectionContent = Array.isArray(endSection)
    ? endSection
    : [endSection];

  return (
    <div className={clsx('entity-edit-form', className)}>
      <div className="entity-edit-form__content">
        <div className="entity-edit-form__start">
          {startSectionContent.map((section, index) => (
            <Card key={index}>{section}</Card>
          ))}
        </div>
        <div className="entity-edit-form__end">
          {endSectionContent.map((section, index) => (
            <Card key={index}>{section}</Card>
          ))}
        </div>
      </div>
    </div>
  );
};
