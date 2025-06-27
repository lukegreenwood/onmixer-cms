import clsx from 'clsx';

import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return <div className={clsx('card', className)}>{children}</div>;
};
