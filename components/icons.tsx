import { TrashIcon } from "@radix-ui/react-icons";
import { ShoppingCartIcon } from "lucide-react";
export type IconProps = React.SVGProps<SVGSVGElement>;
const Icons = {
  home: ({ ...props }: IconProps) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 16V7C0 6.68333 0.0709998 6.38333 0.213 6.1C0.355 5.81667 0.550667 5.58333 0.8 5.4L6.8 0.9C7.15 0.633333 7.55 0.5 8 0.5C8.45 0.5 8.85 0.633333 9.2 0.9L15.2 5.4C15.45 5.58333 15.646 5.81667 15.788 6.1C15.93 6.38333 16.0007 6.68333 16 7V16C16 16.55 15.804 17.021 15.412 17.413C15.02 17.805 14.5493 18.0007 14 18H11C10.7167 18 10.4793 17.904 10.288 17.712C10.0967 17.52 10.0007 17.2827 10 17V12C10 11.7167 9.904 11.4793 9.712 11.288C9.52 11.0967 9.28267 11.0007 9 11H7C6.71667 11 6.47933 11.096 6.288 11.288C6.09667 11.48 6.00067 11.7173 6 12V17C6 17.2833 5.904 17.521 5.712 17.713C5.52 17.905 5.28267 18.0007 5 18H2C1.45 18 0.979333 17.8043 0.588 17.413C0.196666 17.0217 0.000666667 16.5507 0 16Z" />
    </svg>
  ),
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
  cart: ({ ...props }: IconProps) => <ShoppingCartIcon {...props} />,
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
