import React from "react";

import { Slide, SlideColumn, SlideHeader } from "../layout/slide";
import { Paragraph } from "../ui/paragraph";
import Link from "next/link";
import { PieChartDonut } from "../charts/pie-chart-donut";
import { ChartConfig } from "../ui/chart";
import { PITCH } from "@/constants/pitch";

export default function SettlingIn() {
  const chartConfig = {
    users: {
      label: "Users",
    },
    chrome: {
      label: "clubs",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "meetups",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "jobs",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "volunteering",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "other",
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
        <SlideHeader title="Tackling social integration" />
        <Paragraph>
          Despite Denmark&apos;s high rankings in quality of life and work-life
          balance, expats face significant challenges when it comes to social
          integration and building personal connections.
        </Paragraph>
        <Paragraph>
          Addressing these social integration issues is crucial for Denmark to
          fully capitalize on its strengths in work-life balance and quality of
          life. Improving the social experience for expats could lead to better
          retention of international talent, enriched cultural diversity, and a
          more globally competitive environment for businesses and innovation.
        </Paragraph>
        <SlideHeader title="Ease of Settling In" />
        <Paragraph>
          Primary goals of this project is to make it easier for expats to
          settle in Denmark by providing a platform to find friends and
          activities through a common shared recurring activity.
        </Paragraph>
        <span className="text-muted-foreground text-sm italic flex items-center gap-2 pt-8">
          source:
          <Link
            href="https://www.internations.org/expat-insider/2024/quality-of-life-index-40451"
            target="_blank"
            className="text-accent text-sm italic underline"
          >
            Expat Insider 2024
          </Link>
        </span>
      </SlideColumn>
      <SlideColumn className="col-span-5">
        <Paragraph>
          Specific suggestions for meeting people include joining sports clubs,
          political associations, volunteer organizations, or even taking on
          part-time jobs with social environments, like bartending.
        </Paragraph>
        <PieChartDonut
          title="Common advice"
          description="Common channels for expats to form connections suggested by Reddit users"
          totalLabel="user comments"
          data={PITCH.social_integration.common_advice}
          config={chartConfig}
        />
        <Paragraph>
          The general consensus is that while initiating friendships can be
          difficult due to what some users perceive as a reserved Danish
          culture, most Danes are open to friendship once a connection is
          established. Consistently meeting the same people through regular
          activities, such as weekly tournaments, can help build connections.
        </Paragraph>
      </SlideColumn>
    </Slide>
  );
}
