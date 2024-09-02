"use client";

import React from "react";
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
import Icons from "./icons";
import { usePathname } from "next/navigation";

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
          href={href}
          className={`group relative  flex h-9 w-full items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-12 md:w-full ${
            isActive ? "text-secondary-light" : "text-accent-light"
          }`}
        >
          {isActive && (
            <span className="absolute left-0 h-full w-1  bg-secondary-light " />
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
  return (
    <>
      <nav className="flex flex-col items-center gap-8 py-8 w-full">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Icons.logo className="h-8 w-8 transition-all group-hover:scale-110 fill-secondary-light" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <MenuItem href="#" icon={Home} label="Dashboard" />
        <MenuItem href="#" icon={ShoppingCart} label="Orders" />
        <MenuItem href="#" icon={Package} label="Products" isActive={true} />
        <MenuItem href="#" icon={Users2} label="Customers" />
        <MenuItem href="#" icon={LineChart} label="Analytics" />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
}
