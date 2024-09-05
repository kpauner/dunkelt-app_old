"use client";

import React from "react";
import Icons from "./icons";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "./user-dropdown";
import { useLocale } from "next-intl";

type MenuItemProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  className?: string;
};

function MenuItem({
  href,
  icon: Icon,
  label,
  isActive = false,
  className,
}: MenuItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          prefetch={false}
          href={href}
          className={`group relative  flex h-9 w-full items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-12 md:w-full ${
            isActive
              ? "text-accent"
              : "fill-primary-foreground text-primary-foreground"
          }`}
        >
          {isActive && (
            <span className="absolute left-0 h-full w-1  bg-accent" />
          )}
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export default function SidebarNavigation() {
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (href: string) => {
    const path = href === "/" ? `/${locale}` : `/${locale}${href}`;
    return href === "/"
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(path);
  };

  console.log(isActive("/"));

  return (
    <>
      <nav className="flex flex-col items-center gap-8 py-8 w-full">
        <Link
          href="/"
          className="group flex w-8 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-accent-foreground md:w-8 md:text-base"
        >
          <Icons.logo className="w-8 transition-all group-hover:scale-110 fill-accent" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <MenuItem
          href="/"
          icon={Icons.home}
          label="Dashboard"
          isActive={isActive("/")}
        />
        <MenuItem
          href={`/${locale}/codex`}
          icon={Icons.codex}
          label="Codex"
          isActive={isActive("/codex")}
        />
        <MenuItem
          href="/orders"
          icon={Icons.cart}
          label="Orders"
          isActive={isActive("/orders")}
        />

        <MenuItem
          href={`/${locale}/characters`}
          icon={Icons.characters}
          label="Characters"
          isActive={isActive("/characters")}
        />
        <MenuItem
          href="/games"
          icon={Icons.dice}
          label="Games"
          isActive={isActive("/games")}
        />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-8">
        <MenuItem
          href="/settings"
          icon={Icons.settings}
          label="Settings"
          isActive={isActive("/settings")}
        />
        <UserDropdown />
      </nav>
    </>
  );
}
