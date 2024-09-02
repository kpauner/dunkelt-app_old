import { TrashIcon } from "@radix-ui/react-icons";
export type IconProps = React.SVGProps<SVGSVGElement>;
const Icons = {
  logo: ({ ...props }: IconProps) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 168 225"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_111_2)">
        <path d="M83.93 0.709961L46.58 38.15V194.96L74.24 222.54V67.78L83.15 57.9L92.07 67.78V223.72L119.53 196.23V36.26L83.93 0.709961Z" />
        <path d="M28.17 137.33V58.99L0.5 86.66V148.8L35.63 183.93V144.8L28.17 137.33Z" />
        <path d="M139.63 137.33V58.99L167.3 86.66V148.8L132.17 183.93V144.8L139.63 137.33Z" />
      </g>
      <defs>
        <clipPath id="clip0_111_2">
          <rect width="100%" height="100%" />
        </clipPath>
      </defs>
    </svg>
  ),
};

export default Icons;
