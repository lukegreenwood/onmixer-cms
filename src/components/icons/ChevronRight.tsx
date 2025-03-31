import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ChevronRightIcon({ size = 24, ...props }: IconProps) {
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
        id="mask0_616_7458"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_616_7458)">
        <path
          d="M12.9462 12.5L8.87309 8.42689C8.73462 8.28844 8.66379 8.1144 8.66059 7.90479C8.65737 7.69519 8.7282 7.51795 8.87309 7.37309C9.01795 7.2282 9.19359 7.15576 9.39999 7.15576C9.60639 7.15576 9.78202 7.2282 9.92689 7.37309L14.4211 11.8673C14.5147 11.9609 14.5807 12.0596 14.6192 12.1635C14.6577 12.2673 14.6769 12.3795 14.6769 12.5C14.6769 12.6205 14.6577 12.7327 14.6192 12.8365C14.5807 12.9404 14.5147 13.0391 14.4211 13.1327L9.92689 17.6269C9.78844 17.7654 9.6144 17.8362 9.40479 17.8394C9.19519 17.8426 9.01795 17.7718 8.87309 17.6269C8.7282 17.482 8.65576 17.3064 8.65576 17.1C8.65576 16.8936 8.7282 16.718 8.87309 16.5731L12.9462 12.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
