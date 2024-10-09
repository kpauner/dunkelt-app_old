import { PageLayout } from "@/components/layout/page-layout";
import MysteriesList from "@/components/mysteries/mystery-list";
import React from "react";

export default function MysteriesPage() {
  return (
    <PageLayout
      title="Mysteries"
      description="Manage your mysteries and their attributes, moves, and items."
      contentLayout="grid"
    >
      <MysteriesList />
    </PageLayout>
  );
}
