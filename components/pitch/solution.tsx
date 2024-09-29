import React from "react";

import { Slide, SlideColumn, SlideHeader } from "../layout/slide";
import { Paragraph } from "../ui/paragraph";
import Heading from "../layout/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  List,
  ListDescription,
  ListItem,
  ListKey,
  ListTitle,
  ListValue,
} from "../ui/list";
import { PITCH } from "@/constants/pitch";
import { AssetContent } from "../asset";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { StatisticsRadarChart } from "../statistics-radar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadialChartStacked } from "../radial-chart-stacked";
import { PieChartDonut } from "../pie-chart-donut";
import { ChartConfig } from "../ui/chart";

export default function Solution() {
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <Slide
      grid
      columns={8}
      gap={6}
      className="h-full min-h-[calc(100vh-132px)]"
    >
      <SlideColumn className="col-span-3">
        <SlideHeader title="Solution" />
        <Paragraph>
          Dunkelt is a digital toolset and online platform centered around the
          popular tabletop role-playing game Monster Of The Week.
        </Paragraph>
        <ul className="">
          <li>
            <strong className="text-primary">Digital character sheets:</strong>{" "}
            Users can create and manage their MotW characters online, with
            automatic calculations for stats, skills, and abilities.
          </li>
          <li>
            <strong className="text-primary">Rules compendium:</strong> It
            provides tooltips to help you with the rules.
          </li>
          <li>
            <strong className="text-primary">Codex:</strong> A searchable
            database of creatures, locations, items and NPCs.
          </li>
          <li>
            <strong className="text-primary">Campaign management:</strong>
            Features for organizing and MotW campaigns.
          </li>
        </ul>

        {/* <SlideHeader title="Challenges" />
        <Paragraph>
          Addressing these social integration issues is crucial for Denmark to
          fully capitalize on its strengths in work-life balance and quality of
          life. Improving the social experience for expats could lead to better
          retention of international talent, enriched cultural diversity, and a
          more globally competitive environment for businesses and innovation.
        </Paragraph> */}
      </SlideColumn>
      <SlideColumn className="col-span-5 ">
        <div className="grid grid-cols-2 gap-4">
          <Blocks
            title="Cross-Border Connections"
            description="Create or join campaigns across Denmark and beyond, tracking mysteries across national borders."
            text="Connect with players in Denmark or abroad, fostering long-term relationships through shared adventures. Build a network of fellow hunters, transforming single sessions into enduring friendships and ongoing campaigns."
          />
          <Blocks
            title="Campaign Hub"
            description="A central platform for discovering and managing Monster of the Week campaigns."
            text="Browse, join, or create campaigns that span different locations. Engage with a diverse community of players, sharing unique perspectives and play styles."
          />
          <Blocks
            title="Shared Timeline"
            description="Collaborate with other Keepers to shape the evolving story of the Dunkelt world."
            text="Contribute to a collective narrative that spans multiple campaigns. Players can influence the overarching story, creating a sense of community and shared purpose. Follow the timeline to see how other groups' actions affect the wider world."
          />
          <Blocks
            title="European Mysteries"
            description="Delve into the rich tapestry of legends and folklore across Europe."
            text="Explore and blend diverse local myths and cryptids from various regions. Share your cultural knowledge while learning about others', creating unique narratives that celebrate both our shared heritage and distinct traditions."
          />
        </div>
      </SlideColumn>
    </Slide>
  );
}

function Blocks({
  text,
  title,
  description,
}: {
  text: string;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{text}</CardContent>
    </Card>
  );
}
