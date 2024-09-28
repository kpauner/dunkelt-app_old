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

export default function Slide2() {
  return (
    <Slide
      grid
      columns={8}
      gap={6}
      className="h-full min-h-[calc(100vh-132px)]"
    >
      <SlideColumn className="col-span-3">
        <SlideHeader title="Social Hurdles for Expats" />
        <Paragraph>
          Despite Denmark&apos;s high rankings in quality of life and work-life
          balance, expats face significant challenges when it comes to social
          integration and building personal connections.
        </Paragraph>
        <Heading as="h2" size="sm">
          Social Hurdles for Expats
        </Heading>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col gap-2">
            <ListTitle>Ease of Settling In</ListTitle>
            <Paragraph>
              Denmark ranks 45th out of 53 countries, indicating significant
              difficulties for expats in feeling at home.
            </Paragraph>
          </li>
          <li className="flex flex-col gap-2">
            <ListTitle>Finding Friends</ListTitle>
            <ListDescription>
              With a ranking of 47th, Denmark is one of the most challenging
              countries for expats to build a social network.
            </ListDescription>
          </li>
          <li className="flex flex-col gap-2">
            <ListTitle>Local Friendliness</ListTitle>
            <ListDescription>
              Expats rate Denmark 45th for the friendliness of local residents,
              suggesting a perceived coldness or difficulty in connecting with
              Danes.
            </ListDescription>
          </li>
          <li className="flex flex-col gap-2">
            <ListTitle>Culture and Welcome</ListTitle>
            <ListDescription>
              Ranking 44th, Denmark struggles to provide a welcoming atmosphere
              for newcomers.
            </ListDescription>
          </li>
        </ul>

        <Paragraph>
          Addressing these social integration issues is crucial for Denmark to
          fully capitalize on its strengths in work-life balance and quality of
          life. Improving the social experience for expats could lead to better
          retention of international talent, enriched cultural diversity, and a
          more globally competitive environment for businesses and innovation.
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
        <Blocks />
        <Blocks />
        <Blocks />
        <Blocks />
        <Blocks />
      </SlideColumn>
    </Slide>
  );
}

function Blocks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ease of Settling In</CardTitle>
        <CardDescription>
          Denmark ranks 45th out of 53 countries, indicating significant
          difficulties for expats in feeling at home.
        </CardDescription>
      </CardHeader>
      <CardContent>ddd</CardContent>
    </Card>
  );
}
