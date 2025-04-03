import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ChevronUpIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_667_9867"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.240295" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_667_9867)">
        <path
          d="M12 10.6787L7.92689 14.7518C7.78844 14.8903 7.6144 14.9611 7.40479 14.9643C7.19519 14.9675 7.01795 14.8967 6.87309 14.7518C6.7282 14.607 6.65576 14.4313 6.65576 14.2249C6.65576 14.0185 6.7282 13.8429 6.87309 13.698L11.3673 9.20378C11.4609 9.11019 11.5596 9.04417 11.6635 9.0057C11.7673 8.96725 11.8795 8.94803 12 8.94803C12.1205 8.94803 12.2327 8.96725 12.3365 9.0057C12.4404 9.04417 12.5391 9.11019 12.6327 9.20378L17.1269 13.698C17.2654 13.8365 17.3362 14.0105 17.3394 14.2201C17.3426 14.4297 17.2718 14.607 17.1269 14.7518C16.982 14.8967 16.8064 14.9691 16.6 14.9691C16.3936 14.9691 16.218 14.8967 16.0731 14.7518L12 10.6787Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
