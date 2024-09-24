"use client";

import { usePathname } from "next/navigation";
import CodexTabs from "@/components/codex/codex-tabs";
import { PageLayout } from "@/components/layout/page-layout";
import Icons from "@/components/icons";
import { useLocale } from "next-intl";

// Define a type for the props
type CodexTemplateProps = {
  children: React.ReactNode;
};

export default function CodexTemplate({ children }: CodexTemplateProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  const codexMenu = [
    {
      icon: Icons.bestiary,
      label: "Bestiary",
      url: `/codex/bestiary`,
      isActive: isActive("/codex/bestiary"),
    },
    {
      icon: Icons.bystanders,
      label: "Bystanders",
      url: `/codex/bystanders`,
      isActive: isActive("/codex/bystanders"),
    },
    {
      icon: Icons.items,
      label: "Items",
      url: `/codex/items`,
      isActive: isActive("/codex/items"),
    },
    // Add more menu items as needed
  ];

  return <PageLayout menu={codexMenu}>{children}</PageLayout>;
}
