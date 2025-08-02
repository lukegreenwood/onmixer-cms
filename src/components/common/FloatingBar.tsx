'use client';

import { ReactNode } from 'react';

interface FloatingBarProps {
  children: ReactNode;
  className?: string;
}

export const FloatingBar = ({ children, className = '' }: FloatingBarProps) => {
  return (
    <div className={`floating-bar ${className}`}>
      {children}
    </div>
  );
};