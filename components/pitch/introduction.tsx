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

export default function Introduction() {
  const QualityOfLife = [
    { category: "Quality of Life", rank: 8 },
    { category: "Leisure Options", rank: 31 },
    { category: "Travel and Transit", rank: 16 },
    { category: "Healthcare", rank: 21 },
    { category: "Safety and Security", rank: 1 },
    { category: "Environment and Climate", rank: 10 },
  ];

  return (
    <Slide
      grid
      columns={8}
      gap={6}
      className="h-full min-h-[calc(100vh-132px)]"
    >
      <SlideColumn className="col-span-3">
        <SlideHeader title="The Problem" />
        <Paragraph>Pitch</Paragraph>
        <Heading as="h2" size="sm">
          Insights
        </Heading>
        <Paragraph>
          Expat Insider 2023: Overall Rankings and Key Findings The 2023 Expat
          Insider survey, celebrating its tenth anniversary, represents one of
          the largest global surveys on living and working abroad, featuring
          insights from over 12,000 expats of 171 nationalities residing in 172
          countries or territories.
        </Paragraph>
        <Paragraph>
          The survey encompasses expat opinions on 56 aspects of life abroad,
          including the cost of living, housing availability, career prospects,
          internet access, social life, and healthcare quality, culminating in a
          ranking of 53 destinations. The survey evaluated expat satisfaction
          across 56 aspects of life abroad, utilizing a seven-point scale to
          gauge both emotional and factual elements. These individual ratings
          were grouped into 16 subcategories, forming five topical indices,
          which, along with overall life satisfaction, determined the final
          country ranking.
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
        <Tabs defaultValue="Quality of Life">
          <TabsList>
            <TabsTrigger value="Quality of Life">Quality of Life</TabsTrigger>
            <TabsTrigger value="Ease of Settling In">
              Ease of Settling in
            </TabsTrigger>
            <TabsTrigger value="Working Abroad">Working Abroad</TabsTrigger>
            <TabsTrigger value="Working Abroad">Personal Finance</TabsTrigger>
            <TabsTrigger value="Working Abroad">Expat Essentials</TabsTrigger>
          </TabsList>

          <TabsContent value="Quality of Life">
            <Paragraph className="pt-4">
              The Quality of Life index is designed to provide a holistic view
              of the expatriate experience, covering a wide range of factors
              that can impact the quality of life for expatriates.
            </Paragraph>
            <AssetContent>
              <StatisticsRadarChart
                title="Denmark's Quality of Life Score"
                description="Based on the Expat Insider survey"
                data={QualityOfLife}
                totalCountries={53}
                footerTitle="Rankings out of 53 countries"
                footerDescription="Based on a survey of over 12,000 expatriates"
              />
            </AssetContent>
            <Paragraph>
              Denmark generally scores well in all subcategories in the Quality
              of Life category with the small exception of leisure options,
              ranking 31 out of 53.
            </Paragraph>
          </TabsContent>
          <TabsContent value="Ease of Settling In">
            <Paragraph>
              The Quality of Life index is a comprehensive assessment of
              expatriates perceptions of the various aspects of life in their
              host countries. It is designed to provide a holistic view of the
              expatriate experience, covering a wide range of factors that can
              impact the quality of life for expatriates.
            </Paragraph>
            <AssetContent title="Total Quality of Life Ranking">
              <List>
                {PITCH.introduction.qualityOfLife.map((item, index) => (
                  <ListItem key={index} index={index}>
                    <ListKey
                      className={cn(
                        "capitalize",
                        item.active
                          ? "text-accent font-bold"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.key}
                    </ListKey>
                    <ListValue
                      className={cn(
                        "capitalize",
                        item.active ? "text-accent font-bold" : ""
                      )}
                    >
                      {item.value}
                    </ListValue>
                  </ListItem>
                ))}
              </List>
            </AssetContent>
            <Paragraph>
              Denmark generally scores well in all subcategories in the Quality
              of Life category with the small exception of leisure options,
              ranking 31 out of 53.
            </Paragraph>
          </TabsContent>
          <TabsContent value="insights">
            <Paragraph>Insights</Paragraph>
          </TabsContent>
          <TabsContent value="findings">
            <Paragraph>Findings</Paragraph>
          </TabsContent>
        </Tabs>
      </SlideColumn>
    </Slide>
  );
}
