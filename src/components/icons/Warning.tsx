import * as React from 'react';

import { type IconProps } from './types';

export const WarningIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    const { size = 24, title, ...rest } = props;
    const titleId = title
      ? `ic-${Date.now()}-${Math.floor(Math.random() * 10000)}`
      : undefined;

    return (
      <svg
        ref={ref}
        aria-labelledby={titleId}
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        {...rest}
      >
        {title && <title id={titleId}>{title}</title>}
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  },
);

WarningIcon.displayName = 'WarningIcon';
