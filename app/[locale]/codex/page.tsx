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
import { getBestiaries } from "@/data-access/bestiary";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import TableBestiary from "@/components/codex/table-bestiary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <div className="grid w-full gap-6 grid-cols-3 grid-rows-2">
                <TableBestiary data={bestiaries} columns={bestiaryColumns} />
              </div>
            </TabsContent>
          </Tabs>
        </DashboardContent>
      </DashboardWrapper>
    </Dashboard>
  );
}
