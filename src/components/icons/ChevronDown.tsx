import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function ChevronDownIcon({ size = 24, ...props }: IconProps) {
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
        id="mask0_616_4697"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_616_4697)">
        <path
          d="M12.0001 15.1615C11.8796 15.1615 11.7675 15.1423 11.6636 15.1038C11.5598 15.0654 11.4611 14.9993 11.3675 14.9058L6.87325 10.4115C6.73478 10.2731 6.66395 10.0991 6.66075 9.88944C6.65753 9.67982 6.72837 9.50258 6.87325 9.35771C7.01812 9.21284 7.19375 9.14041 7.40015 9.14041C7.60655 9.14041 7.78218 9.21284 7.92705 9.35771L12.0001 13.4308L16.0732 9.35771C16.2117 9.21926 16.3857 9.14843 16.5953 9.14521C16.8049 9.14201 16.9822 9.21284 17.127 9.35771C17.2719 9.50258 17.3444 9.67822 17.3444 9.88464C17.3444 10.091 17.2719 10.2667 17.127 10.4115L12.6328 14.9058C12.5392 14.9993 12.4405 15.0654 12.3367 15.1038C12.2328 15.1423 12.1207 15.1615 12.0001 15.1615Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
