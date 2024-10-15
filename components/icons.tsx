import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  HomeIcon,
  ShoppingCartIcon,
  FilterIcon,
  Dice6Icon,
  BookCopyIcon,
  Users2,
  MapPin,
  ContactIcon,
  Settings,
  MessageSquare,
  LogOut,
  LogIn,
  ArrowLeft,
  User,
  LifeBuoy,
  CircleHelp,
  CircleAlertIcon,
  CircleXIcon,
  AlertTriangleIcon,
  BriefcaseIcon,
  ArrowUpDown,
  EllipsisVertical,
  EllipsisIcon,
  ChevronDown,
  ChevronUp,
  Sword,
  Shield,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserPenIcon,
  CheckIcon,
  PlusIcon,
  UserPlusIcon,
  Trash,
  MinusIcon,
  VenetianMaskIcon,
} from "lucide-react";
export type IconProps = React.SVGProps<SVGSVGElement>;
const Icons = {
  home: HomeIcon,
  cart: ShoppingCartIcon,
  filter: FilterIcon,
  dice: Dice6Icon,
  codex: BookCopyIcon,
  bystanders: Users2,
  user: User,
  locations: MapPin,
  characters: ContactIcon,
  settings: Settings,
  feedback: MessageSquare,
  signout: LogOut,
  signin: LogIn,
  leftarrow: ArrowLeft,
  support: LifeBuoy,
  help: CircleHelp,
  notice: CircleAlertIcon,
  delete: CircleXIcon,
  alert: AlertTriangleIcon,
  items: BriefcaseIcon,
  ellipsisvertical: EllipsisVertical,
  ellipsis: EllipsisIcon,
  armor: Shield,
  editcharacter: UserPenIcon,
  addcharacter: UserPlusIcon,
  trash: Trash,
  add: PlusIcon,
  minus: MinusIcon,
  arrowupdown: ArrowUpDown,
  left: ChevronLeftIcon,
  doubleleft: DoubleArrowLeftIcon,
  right: ChevronRightIcon,
  doubleright: DoubleArrowRightIcon,
  weapon: Sword,
  chevrondown: ChevronDown,
  chevronup: ChevronUp,
  mystery: VenetianMaskIcon,
  check: CheckIcon,
  invite: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fill-rule="evenodd">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          fill="currentColor"
          d="M17 3a3 3 0 0 1 2.995 2.824L20 6v4.35l.594-.264c.614-.273 1.322.15 1.4.798L22 11v8a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19v-8c0-.672.675-1.147 1.297-.955l.11.041l.593.264V6a3 3 0 0 1 2.824-2.995L7 3zm3 9.539l-7.188 3.194a2 2 0 0 1-1.624 0L4 12.54V19h16zM17 5H7a1 1 0 0 0-1 1v5.239l6 2.667l6-2.667V6a1 1 0 0 0-1-1m-5 3a1 1 0 0 1 .117 1.993L12 10h-2a1 1 0 0 1-.117-1.993L10 8z"
        />
      </g>
    </svg>
  ),
  bestiary: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M108.777 256.058c.286 56.565 13.983 101.827 24.942 133.585C85.56 317.753 30.9 187.787 120.5 112.147c-42.56-4.31-92.374 25.796-95.78 71.213h-.19c-1.068 14.052 2.58 29.756 11.746 46.133C16.312 284.78 15.33 345.708 49.6 433.393c19.18 49.048 70.854 62.702 120.752 53.94c36.346-6.4 70.19-22.667 93.294-59.754c40.158-64.48 59.99-105.418 101.79-135.42c46.526-19.777 97.54-3.25 123.88 22.454c-7.476-57.55-70.396-111.51-120.465-56.763c-41.325 7.66-69.025 17.52-115.722 51.235c19.65-38.758 56.327-84.913 79.13-112.415c33.693-41.608 102.853-56.82 138.524-48.106c-31.99-45.34-127.917-59.59-149.615 12.53c-42.008 19.263-94.897 60.85-129.908 102.997c11.58-52.748 33.18-117.786 54.347-155.208c33.825-36.553 83.77-35.932 114.623-26.564c-28.904-46.596-121.244-70.12-138.495 12.993c-43.11 33.08-87.248 100.11-112.956 160.748z"
      />
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
  logo: ({ ...props }: IconProps) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 144 63"
      fill="currentColor"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_150_25)">
        <path
          d="M72 36C81.9411 36 90 27.9411 90 18C90 8.05887 81.9411 0 72 0C62.0589 0 54 8.05887 54 18C54 27.9411 62.0589 36 72 36Z"
          fill="currentColor"
        />
        <path
          d="M142.87 9H107.68C102.81 9 98.97 13 98.99 17.87C98.99 19.11 98.92 20.37 98.75 21.65C97.13 33.84 87.22 43.53 74.99 44.84C58.74 46.59 44.99 33.9 44.99 18V17.91C44.99 13.01 40.98 9 36.08 9H1.13C0.51 9 0 9.5 0 10.13C0 10.66 0.37 11.12 0.89 11.23C6.85 12.51 13.43 14.53 19.35 17.7C23.98 20.19 27.19 24.61 28.55 29.68C33.66 48.75 50.99 62.82 71.64 62.99C71.88 62.99 72.01 62.99 72.01 62.99C72.01 62.99 72.14 62.99 72.38 62.99C93.03 62.82 110.35 48.75 115.47 29.68C116.83 24.6 120.04 20.18 124.67 17.7C130.59 14.52 137.16 12.51 143.13 11.23C143.65 11.12 144.02 10.66 144.02 10.13C144.02 9.51 143.52 9 142.89 9H142.87Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_150_25">
          <rect width="100%" height="100%" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  ),
  logooutline: ({ ...props }: IconProps) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 287 296"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_153_8)">
        <path
          d="M139 0H13C5.82 0 0 5.82 0 13V283C0 290.18 5.82 296 13 296H139C220.61 296 287 229.61 287 148C287 66.39 220.61 0 139 0ZM26 89H143.5C176.03 89 202.5 115.47 202.5 148C202.5 180.53 176.03 207 143.5 207H94C86.82 207 81 212.82 81 220V270H26V89ZM139 270H107V233H143.5C190.37 233 228.5 194.87 228.5 148C228.5 101.13 190.37 63 143.5 63H26V26H139C206.27 26 261 80.73 261 148C261 215.27 206.27 270 139 270Z"
          fill="currentColor"
        />
        <path
          d="M121 184C140.882 184 157 167.882 157 148C157 128.118 140.882 112 121 112C101.118 112 85 128.118 85 148C85 167.882 101.118 184 121 184Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_153_8">
          <rect width="100%" height="100%" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  ),
  google: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1-1.265.06a6 6 0 1 0 2.103 6.836l.001-.004h-3.66a1 1 0 0 1-.992-.883L13 13v-2a1 1 0 0 1 1-1h6.945a1 1 0 0 1 .994.89q.06.55.061 1.11c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2"
      />
    </svg>
  ),
};

export default Icons;
