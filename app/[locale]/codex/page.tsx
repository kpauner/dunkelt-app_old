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
import { Card, CardHeader } from "@/components/ui/card";

export default function Bestiary() {
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
            <Card className="col-span-2 row-span-2">
              <CardHeader>
                <h3>Large Card</h3>
              </CardHeader>
            </Card>
            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <h3>Card 1</h3>
              </CardHeader>
            </Card>
            <Card className="col-span-1 row-span-1">
              <CardHeader>
                <h3>Card 2</h3>
              </CardHeader>
            </Card>
          </div>
        </DashboardContent>
      </DashboardWrapper>
    </Dashboard>
  );
}
