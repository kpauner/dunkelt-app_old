import React from "react";
import { PageLayout } from "@/components/layout/page-layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Grid from "@/components/layout/grid";
import { Avatar } from "@/components/ui/avatar";
import { AVATARS } from "@/constants/constants";
import AssignedCharacters from "@/features/mysteries/components/assigned-characters";

type MysteryPageProps = {
  params: {
    mysteryId: string;
    locale: string;
  };
};

export default async function MysteryPage({ params }: MysteryPageProps) {
  return (
    <PageLayout
      title={params.mysteryId}
      description="We suspect a high ranking cult member, behind the disappearance of a local family has escaped to Denmark. We are looking for a hunter familiar with the country to assist in the search."
      contentLayout="list"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Hunsters assigned</h1>
        <Grid>
          <AssignedCharacters mysteryId={params.mysteryId} />
        </Grid>
      </div>
    </PageLayout>
  );
}
