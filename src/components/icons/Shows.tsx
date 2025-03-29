import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ShowsIcon({ size = 24, ...props }: IconProps) {
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
        id="mask0_616_5951"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_616_5951)">
        <path
          d="M4.5076 21.1C4.05747 21.1 3.67699 20.9444 3.36615 20.6332C3.05532 20.3221 2.8999 19.9412 2.8999 19.4906V9.29575C2.8999 8.90116 3.02844 8.5449 3.2855 8.22695C3.54255 7.909 3.85569 7.67694 4.22493 7.53077L16.5749 3.09235L17.046 4.40772L8.01518 7.70002H19.4913C19.947 7.70002 20.329 7.85554 20.6374 8.16657C20.9457 8.47761 21.0999 8.85832 21.0999 9.30872V19.4994C21.0999 19.9498 20.9444 20.3291 20.6336 20.6375C20.3228 20.9458 19.9423 21.1 19.4922 21.1H4.5076ZM4.5076 19.8H19.4922C19.5691 19.8 19.6396 19.7679 19.7037 19.7038C19.7678 19.6397 19.7999 19.5692 19.7999 19.4923V12.9692H4.19988V19.4923C4.19988 19.5692 4.23193 19.6397 4.29603 19.7038C4.36014 19.7679 4.43067 19.8 4.5076 19.8ZM7.71733 18.2923C8.33004 18.2923 8.85211 18.0784 9.28353 17.6508C9.71493 17.2231 9.93063 16.703 9.93063 16.0902C9.93063 15.4775 9.7168 14.9554 9.28915 14.524C8.8615 14.0926 8.34131 13.8769 7.72858 13.8769C7.11586 13.8769 6.59379 14.0907 6.16238 14.5184C5.73098 14.946 5.51528 15.4662 5.51528 16.079C5.51528 16.6917 5.7291 17.2138 6.15675 17.6452C6.5844 18.0766 7.10459 18.2923 7.71733 18.2923ZM4.19988 11.6692H16.4499V9.94617H17.7499V11.6692H19.7999V9.30772C19.7999 9.23079 19.7678 9.16026 19.7037 9.09615C19.6396 9.03205 19.5691 9 19.4922 9H4.5076C4.43067 9 4.36014 9.03205 4.29603 9.09615C4.23193 9.16026 4.19988 9.23079 4.19988 9.30772V11.6692Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
