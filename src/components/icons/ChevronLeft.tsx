import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ChevronLeftIcon({ size = 24, ...props }: IconProps) {
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
        id="mask0_616_7443"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_616_7443)">
        <path
          d="M10.4539 12.5L14.5269 16.5731C14.6654 16.7115 14.7362 16.8856 14.7394 17.0952C14.7427 17.3048 14.6718 17.482 14.5269 17.6269C14.3821 17.7718 14.2064 17.8442 14 17.8442C13.7936 17.8442 13.618 17.7718 13.4731 17.6269L8.97892 13.1327C8.88532 13.0391 8.81929 12.9404 8.78084 12.8365C8.74238 12.7327 8.72314 12.6205 8.72314 12.5C8.72314 12.3795 8.74238 12.2673 8.78084 12.1635C8.81929 12.0596 8.88532 11.9609 8.97892 11.8673L13.4731 7.3731C13.6116 7.23463 13.7856 7.1638 13.9952 7.1606C14.2048 7.15738 14.3821 7.22821 14.5269 7.3731C14.6718 7.51796 14.7443 7.6936 14.7443 7.9C14.7443 8.1064 14.6718 8.28203 14.5269 8.4269L10.4539 12.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
