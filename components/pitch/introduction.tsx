import React from "react";

import { PITCH } from "@/constants/pitch";
import Link from "next/link";
import { Slide, SlideColumn, SlideHeader } from "../layout/slide";
import { Paragraph } from "@/components/ui/paragraph";
import Heading from "@/components/layout/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetContent } from "@/components/asset";
import { StatisticsRadarChart } from "@/components/statistics-radar-chart";

export default function Introduction() {
  return (
    <Slide
      grid
      columns={8}
      gap={6}
      className="h-full min-h-[calc(100vh-132px)]"
    >
      <SlideColumn className="col-span-3">
        <SlideHeader title="The Problem" />
        <Paragraph>
          Despite Denmark&apos;s high rankings in quality of life and work-life
          balance, expats face significant challenges when it comes to social
          integration and building personal connections.
        </Paragraph>
        <Heading as="h2" size="sm">
          The Expat Insider 2024 survey
        </Heading>
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

        <Paragraph>
          These low rankings in social factors create a significant barrier for
          expats, potentially affecting their overall happiness and willingness
          to stay long-term in Denmark. The contrast between high professional
          satisfaction and low social integration poses a unique challenge for
          both expats and Danish society.
        </Paragraph>

        <span className="text-muted-foreground text-sm italic flex items-center gap-2 pt-2">
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
            <TabsTrigger value="Personal Finance">Personal Finance</TabsTrigger>
            <TabsTrigger value="Expat Essentials">Expat Essentials</TabsTrigger>
          </TabsList>

          <TabsContent value="Quality of Life">
            <Paragraph className="pt-4">
              The Quality of Life index is designed to provide a holistic view
              of the expatriate experience, covering a wide range of factors
              that can impact the quality of life for expatriates.
            </Paragraph>
            <AssetContent className="my-4">
              <StatisticsRadarChart
                title="Denmark's Quality of Life Score"
                description="Based on the Expat Insider survey of over 12,000 expatriates"
                data={PITCH.introduction.quality_of_life}
                maxValue={53}
                footerTitle="Denmark placed 8th out of 53 countries in the Quality of Life Index."
              />
            </AssetContent>
            <Paragraph>
              Denmark generally scores well in all subcategories in the Quality
              of Life category with the small exception of leisure options,
              ranking 31 out of 53.
            </Paragraph>
          </TabsContent>
          <TabsContent value="Ease of Settling In">
            <Paragraph className="pt-4">
              The Ease of Settling In Index assesses how well expats integrate
              into their new home country. It focuses on three key areas: the
              ability to find friends and build social networks, the feeling of
              being welcomed and adapting to the local culture, and the general
              friendliness of locals towards foreigners
            </Paragraph>
            <AssetContent className="my-4">
              <StatisticsRadarChart
                title="Denmark's Ease of Settling In Score"
                description="Based on the Expat Insider survey"
                data={PITCH.introduction.ease_of_settling_in}
                maxValue={53}
                footerTitle="Denmark placed 45th out of 53 countries in the Ease of Settling In Index."
                footerDescription="Based on a survey of over 12,000 expatriates"
              />
            </AssetContent>
            <Paragraph>
              Denmark struggles to provide a welcoming environment for
              newcomers. These results indicate that while Denmark may excel in
              other areas, it presents a notably tough social landscape for
              expatriates, potentially impacting their overall satisfaction and
              comfort in the country.
            </Paragraph>
          </TabsContent>
          <TabsContent value="Working Abroad">
            <Paragraph className="pt-4">
              The Working Abroad index evaluates expat satisfaction across four
              key subcategories: Career Prospects, Salary & Job Security, Work &
              Leisure, and Work Culture & Satisfaction.
            </Paragraph>
            <AssetContent className="my-4">
              <StatisticsRadarChart
                title="Denmark's Working Abroad Score"
                description="Based on the Expat Insider survey of over 12,000 expatriates"
                data={PITCH.introduction.working_abroad}
                maxValue={53}
                footerTitle="Denmark placed 1st out of 53 countries in the Working Abroad Index"
              />
            </AssetContent>
            <Paragraph>
              While Denmark excels in most areas, it shows room for improvement
              in Career Prospects, ranking 21st out of 53 countries.
              Additionally, job security (22nd) and fair pay perception (60%
              agree they are paid fairly) are areas where Denmark performs
              modestly compared to its stellar rankings in other subcategories.
            </Paragraph>
          </TabsContent>
          <TabsContent value="Personal Finance">
            <Paragraph className="pt-4">
              The Personal Finance Index evaluates expat satisfaction across
              three key factors: general cost of living, satisfaction with their
              financial situation, and whether their disposable household income
              is enough to lead a comfortable life.
            </Paragraph>
            <AssetContent className="my-4">
              <StatisticsRadarChart
                title="Denmark's Personal Finance Score"
                description="Based on the Expat Insider survey of over 12,000 expatriates"
                data={PITCH.introduction.personal_finance}
                maxValue={53}
                footerTitle="Denmark placed 32nd out of 53 countries in the Personal Finance Index"
              />
            </AssetContent>
            <Paragraph>
              While Denmark continues to struggle with high costs of living,
              expats report increased satisfaction with their overall financial
              situation. This improvement has helped Denmark climb out of the
              bottom 10 in the Personal Finance Index.
            </Paragraph>
          </TabsContent>
          <TabsContent value="Expat Essentials">
            <Paragraph className="pt-4">
              The Expat Essentials Index evaluates how easy it is for expats to
              manage practical aspects of life. How easy it is to live without
              speaking the local language and the difficulty of learning it, The
              affordability and availability of housing, Ease of dealing with
              local bureaucracy, getting visas, and opening bank accounts,
              Availability of high-speed internet, online government services,
              and cashless payment options.
            </Paragraph>
            <AssetContent className="my-4">
              <StatisticsRadarChart
                title="Denmark's Expat Essentials Score"
                description="Based on the Expat Insider survey of over 12,000 expatriates"
                data={PITCH.introduction.expat_essentials}
                maxValue={53}
                footerTitle="Denmark placed 28th out of 53 countries in the Expat Essentials Index"
              />
            </AssetContent>
            <Paragraph>
              Denmark performs particularly well in digital infrastructure and
              services but struggles more with housing affordability and
              availability (45th). Language (33rd) might present some
              difficulties for expats, while administrative processes (20th) are
              handled relatively well compared to other countries.
            </Paragraph>
          </TabsContent>
        </Tabs>
      </SlideColumn>
    </Slide>
  );
}
