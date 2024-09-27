"use client";

import { TrendingUp } from "lucide-react";
import {
  DefaultTooltipContent,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type StatisticItem = {
  category: string;
  rank: number;
};

type StatisticsRadarChartProps = {
  title: string;
  description: string;
  footerTitle?: string;
  footerDescription?: string;
  data: StatisticItem[];
  maxValue?: number;
  color?: string;
  totalCountries?: number;
};

// Chart configuration
const defaultChartConfig = {
  statistics: {
    label: "Statistics",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
        <p className="font-semibold">{data.category}</p>
        <p className="text-sm text-muted-foreground">
          Rank: {data.rank} of {data.totalCountries}{" "}
        </p>
      </div>
    );
  }
  return null;
};

export function StatisticsRadarChart({
  title,
  description,
  footerTitle,
  footerDescription,
  data,
  maxValue = 100,
  totalCountries = 53,
  color = defaultChartConfig.statistics.color,
}: StatisticsRadarChartProps) {
  const invertedData = data.map((item) => ({
    ...item,
    invertedRank: totalCountries - item.rank + 1,
    totalCountries, // Add this to each data point for the tooltip
  }));

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 ">
        <ChartContainer
          config={defaultChartConfig}
          className="mx-auto aspect-square max-h-[300px] w-full"
        >
          <RadarChart data={invertedData}>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="category" />

            <Radar
              dataKey="invertedRank"
              fill="var(--color-statistics)"
              fillOpacity={0.4}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {footerTitle && (
          <div className="flex items-center gap-2 font-medium leading-none">
            {footerTitle} <TrendingUp className="h-4 w-4" />
          </div>
        )}
        {footerDescription && (
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            {footerDescription}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
