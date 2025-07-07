'use client';

import { CheckIcon } from '@soundwaves/components';
import { useState } from 'react';
import React from 'react';

import { CopyIcon } from '../icons';

export const Copyable = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div
      className="copyable"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      }}
    >
      {children}
      <div className="copyable__icon">
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </div>
    </div>
  );
};
