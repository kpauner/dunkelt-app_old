import React from "react";
import {
  Dashboard,
  DashboardContent,
  DashboardHeader,
  DashboardSidebar,
  DashboardWrapper,
} from "@/components/layout/dashboard";
import SidebarNavigation from "@/components/sidebar-navigation";
import Header from "@/components/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getBestiaries } from "@/data-access/bestiary";
import BestiaryTable from "@/components/codex/bestiary-table";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";

export default async function CodexPage() {
  const bestiaries = await getBestiaries();
  return (
    <Dashboard>
      <DashboardSidebar>
        <SidebarNavigation />
      </DashboardSidebar>
      <DashboardWrapper>
        <DashboardHeader>
          <Header />
        </DashboardHeader>
        <DashboardContent>
          <div className="grid w-full gap-6 grid-cols-3 grid-rows-2">
            <BestiaryTable data={bestiaries} columns={bestiaryColumns} />
          </div>
        </DashboardContent>
      </DashboardWrapper>
    </Dashboard>
  );
}
