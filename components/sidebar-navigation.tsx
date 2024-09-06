"use client";

import React from "react";
import Icons from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "./user-dropdown";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { getIsActive } from "@/lib/utils";

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

type SidebarNavigationProps = {
  session: Session | null;
};

export default function SidebarNavigation({ session }: SidebarNavigationProps) {
  const pathname = usePathname();
  const locale = useLocale();

  const menuItems = [
    { href: "/", icon: Icons.home, label: "Dashboard" },
    { href: "/codex", icon: Icons.codex, label: "Codex" },
    { href: "/games", icon: Icons.dice, label: "Games" },
    { href: "/orders", icon: Icons.cart, label: "Orders" },
  ];

  return (
    <>
      <nav className="flex flex-col items-center gap-8 py-8 w-full">
        <Link
          href="/"
          className="group flex w-8 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-accent-foreground md:w-8 md:text-base"
        >
          <Icons.logooutline className="w-6 transition-all group-hover:scale-110 fill-accent" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {menuItems.map((item) => {
          const isActive = getIsActive(item.href, pathname, locale);
          return (
            <MenuItem
              key={item.href}
              href={`/${locale}${item.href}`}
              icon={item.icon}
              label={item.label}
              isActive={isActive}
            />
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 py-8">
        <MenuItem
          href={`/${locale}/settings`}
          icon={Icons.settings}
          label="Settings"
          isActive={getIsActive("/settings", pathname, locale)}
        />
        <UserDropdown session={session} />
      </nav>
    </>
  );
}
