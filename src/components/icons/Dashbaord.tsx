import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function DashboardIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_616_5835"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_616_5835)">
        <path
          d="M13.4501 8.40001V4.10004H19.9V8.40001H13.4501ZM4.1001 12.7V4.10004H10.55V12.7H4.1001ZM13.4501 19.9V11.3H19.9V19.9H13.4501ZM4.1001 19.9V15.6H10.55V19.9H4.1001ZM5.40007 11.4H9.2501V5.40001H5.40007V11.4ZM14.75 18.6H18.6001V12.6H14.75V18.6ZM14.75 7.12504H18.6001V5.40001H14.75V7.12504ZM5.40007 18.6H9.2501V16.9H5.40007V18.6Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
