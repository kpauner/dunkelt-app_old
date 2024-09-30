import React from "react";

import { Slide, SlideColumn, SlideHeader } from "../layout/slide";
import { Paragraph } from "../ui/paragraph";
import Heading from "../layout/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
    <Slide className="h-full min-h-[calc(100vh-132px)]">
      <SlideColumn className="max-w-2xl mx-auto text-center">
        <SlideHeader title="Solution" />
        <Paragraph>
          Dunkelt is a digital toolset and online platform centered around the
          popular tabletop role-playing game Monster Of The Week.
        </Paragraph>
        <Heading as="h3" size="sm" className="pb-8">
          Why it works
        </Heading>
      </SlideColumn>
      <SlideColumn className="col-span-5 ">
        <div className="grid grid-cols-4 gap-4">
          <Blocks
            title="Accessible Adventure"
            description="Leverage the unique strengths of TTRPGs for social integration"
            text="Monster of the Week is an ideal system with Its simple rules and collaborative storytelling format make it easy for newcomers to jump in, regardless of gaming experience. Moreover, the flexible narrative allows for seamless integration of Danish cultural elements, making learning about local customs and traditions an organic part of the gameplay experience."
          />
          <Blocks
            title="European Mysteries"
            description="Explore the rich tapestry of legends and folklore across Europe"
            text="Facilitates cultural exchange in a fun, low-pressure environment. Expats can share their cultural knowledge while learning about Danish folklore, creating mutual understanding and appreciation. This feature turns cultural differences into a source of fascination rather than a barrier."
          />
          <Blocks
            title="Campaign Hub"
            description="Foster consistent social interaction through regular game sessions"
            text="Provides a structured, recurring activity that's crucial for building lasting relationships. The predictable schedule and shared interest create a comfortable environment for expats to form connections, addressing the need for regular, meaningful social interactions."
          />
          <Blocks
            title="Shared Timeline"
            description="Shape the evolving story of the Dunkelt world together"
            text="Cultivates a sense of belonging and shared purpose, critical for expats feeling disconnected. By contributing to a collective narrative, players develop a shared history and inside jokes, mimicking the cultural touchstones that often exclude expats in real-life social situations."
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
