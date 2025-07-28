import { IconProps } from './types';

export const RadioIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="8" width="20" height="12" rx="2" ry="2" />
    <path d="m22 11-1-2-3.5 3.5" />
    <circle cx="7" cy="15" r="1" />
    <circle cx="17" cy="15" r="3" />
  </svg>
);