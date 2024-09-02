import { Dashboard, DashboardSidebar } from "@/components/layout/dashboard";
import Header from "@/components/marketing/header";
import Hero from "@/components/marketing/hero";
import SidebarNavigation from "@/components/sidebar-navigation";
import ThemeToggle from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <Dashboard>
      <DashboardSidebar>
        <SidebarNavigation />
      </DashboardSidebar>
    </Dashboard>
  );
}
