import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function CalendarEditIcon({ size = 24, ...props }: IconProps) {
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
        id="mask0_667_7951"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.240295" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_667_7951)">
        <path
          d="M5.7078 21.3403C5.25766 21.3403 4.87718 21.1849 4.56635 20.874C4.25551 20.5632 4.1001 20.1827 4.1001 19.7326V7.14802C4.1001 6.70956 4.25843 6.33199 4.5751 6.01532C4.89176 5.69866 5.26933 5.54032 5.7078 5.54032H7.89242V3.02495H9.23085V5.54032H14.8077V3.02495H16.1077V5.54032H18.2923C18.7308 5.54032 19.1084 5.69866 19.425 6.01532C19.7417 6.33199 19.9 6.70956 19.9 7.14802V12.548H18.6001V11.348H5.40007V19.7326C5.40007 19.8095 5.43212 19.88 5.49622 19.9441C5.56034 20.0082 5.63086 20.0403 5.7078 20.0403H12.5231V21.3403H5.7078ZM5.40007 10.048H18.6001V7.14802C18.6001 7.07109 18.568 7.00057 18.5039 6.93645C18.4398 6.87235 18.3693 6.8403 18.2923 6.8403H5.7078C5.63086 6.8403 5.56034 6.87235 5.49622 6.93645C5.43212 7.00057 5.40007 7.07109 5.40007 7.14802V10.048ZM14.5155 21.3403V18.948L19.6693 13.8191C19.7646 13.7213 19.867 13.6529 19.9764 13.614C20.0858 13.5751 20.1942 13.5557 20.3017 13.5557C20.4161 13.5557 20.5287 13.5768 20.6394 13.6191C20.7501 13.6615 20.8492 13.7249 20.9366 13.8095L22.0366 14.9441C22.1207 15.0395 22.1857 15.1418 22.2314 15.2512C22.2772 15.3606 22.3 15.4691 22.3 15.5766C22.3 15.6841 22.279 15.7933 22.2369 15.9043C22.1948 16.0152 22.1281 16.1176 22.0366 16.2114L16.9077 21.3403H14.5155ZM15.4077 20.448H16.5327L19.6289 17.3614L19.0693 16.7864L18.5289 16.2172L15.4077 19.323V20.448ZM19.0693 16.7864L18.5289 16.2172L19.6289 17.3614L19.0693 16.7864Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
