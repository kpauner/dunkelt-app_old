import { TrashIcon } from "@radix-ui/react-icons";
import {
  HomeIcon,
  ShoppingCartIcon,
  FilterIcon,
  Dice6Icon,
  BookCopyIcon,
} from "lucide-react";
export type IconProps = React.SVGProps<SVGSVGElement>;
const Icons = {
  home: HomeIcon,
  cart: ShoppingCartIcon,
  filter: FilterIcon,
  dice: Dice6Icon,
  codex: BookCopyIcon,
  library: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      {...props}
      viewBox="0 0 24 24"
    >
      <path
        d="M19 7H9V5h10m-4 10H9v-2h6m4-2H9V9h10m1-7H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6z"
        fill="currentColor"
      />
    </svg>
  ),
  logo: ({ ...props }: IconProps) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 168 225"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_111_2)">
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
