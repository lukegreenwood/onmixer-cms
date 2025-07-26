import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function EnrichIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Main star */}
      <path
        d="M12 2L14.39 7.26L20 8.27L16 12.14L17.18 17.73L12 15.27L6.82 17.73L8 12.14L4 8.27L9.61 7.26L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small sparkle top right */}
      <path
        d="M19 5L19.5 6.5L21 7L19.5 7.5L19 9L18.5 7.5L17 7L18.5 6.5L19 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small sparkle bottom left */}
      <path
        d="M5 19L5.5 20.5L7 21L5.5 21.5L5 23L4.5 21.5L3 21L4.5 20.5L5 19Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* AI enhancement dots in center */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="10" cy="10" r="0.5" fill="currentColor" />
      <circle cx="14" cy="14" r="0.5" fill="currentColor" />
    </svg>
  );
}