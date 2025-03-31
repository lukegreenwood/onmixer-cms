import Link from 'next/link';
import { ReactNode } from 'react';

import { ArrowBackIcon } from '../icons';

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  actions?: ReactNode;
  headingExtras?: ReactNode;
  backTo?: string;
}

export function PageHeader({
  heading,
  subheading,
  actions,
  headingExtras,
  backTo,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__content">
        {backTo && (
          <Link href={backTo} className="page-header__back">
            <ArrowBackIcon />
          </Link>
        )}
        <div className="page-header__titles">
          <h1 className="page-header__heading">
            {heading}
            {headingExtras && (
              <div className="page-header__heading-extras">{headingExtras}</div>
            )}
          </h1>
          {subheading && (
            <h2 className="page-header__subheading">{subheading}</h2>
          )}
        </div>
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
  );
}
