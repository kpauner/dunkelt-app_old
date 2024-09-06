"use client";

import { MenuItem } from "@/constants/navigation";
import { cn, getIsActive } from "@/lib/utils";
import { Session } from "next-auth";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SubNavigationProps = {
  menuItems: MenuItem[];
  session: Session;
};

export default function SubNavigation({
  menuItems,
  session,
}: SubNavigationProps) {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {menuItems.map((item) => {
        const isActive = getIsActive(item.href, pathname, locale);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("font-semibold text-primary", {
              "text-accent": isActive,
            })}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
