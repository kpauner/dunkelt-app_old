import { PageLayout } from "@/components/layout/page-layout";
import React from "react";

export default function PostsPage() {
  return (
    <PageLayout variant="post" title="changelog" description="changelog">
      <div className="bg-red-500">PostsPage</div>
    </PageLayout>
  );
}
