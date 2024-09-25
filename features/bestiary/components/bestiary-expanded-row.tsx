import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import { AssetDescription, AssetHeader, AssetTitle } from "@/components/asset";
import TagCloud from "@/components/tag-cloud";
import {
  List,
  ListItem,
  ListTitle,
  ListDescription,
} from "@/components/ui/list";
import { Paragraph } from "@/components/ui/paragraph";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  GetBestiaryByIdResponseType,
  GetBestiaryResponseType,
  SelectBestiary,
} from "@/types/bestiary";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";

type BestiaryExpandedRowProps = {
  row: Row<GetBestiaryByIdResponseType>;
};

export default function BestiaryExpandedRow({ row }: BestiaryExpandedRowProps) {
  const t = useTranslations("bestiary");
  if (!row.original) return null;
  // Example details array, adjust as needed
  const details = [
    {
      label: t("harmCapacity"),
      value: row.original.harmCapacity,
    },
    {
      label: t("armor"),
      value: row.original.armor,
    },
    {
      label: t("origins"),
      value: row.original.tags.origins,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <AssetHeader>
          <AssetTitle title={row.original.name} tags={row.original.type} />
          <AssetDescription text={row.original.description} />
        </AssetHeader>
        <List>
          {details.map((detail, index) => (
            <ListItem
              key={index}
              className={cn(
                "h-8 px-2 flex items-center justify-between",
                index % 2 === 0 ? "bg-primary-dark" : ""
              )}
            >
              <ListTitle>{detail.label}</ListTitle>
              <ListDescription>
                {Array.isArray(detail.value)
                  ? detail.value.join(", ")
                  : detail.value}
              </ListDescription>
            </ListItem>
          ))}
        </List>

        <TagCloud armor={1} harm={2} data={row.original.tags.origins} />
        <Separator className="dark:bg-primary-foreground " />
        <div className="space-y-6">
          {row.original.powers.map((power) => (
            <Paragraph key={power.name} size="sm" className=" ">
              <strong className="font-bold text-primary-foreground">
                {power.name}:
              </strong>{" "}
              {power.description}
            </Paragraph>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <RowSection title="Signs">
          {row.original.signs.map((sign) => (
            <Paragraph key={sign} size="sm" className=" ">
              {sign}
            </Paragraph>
          ))}
        </RowSection>
        <RowSection title="Moves">
          {row.original.bestiaryMoves.map((move) => (
            <div key={move.id} className="space-y-2 pb-4">
              <Paragraph size="sm" className="">
                <strong className="font-bold text-primary-foreground capitalize">
                  {move.name}:{" "}
                </strong>
                {move.description}
              </Paragraph>
              <TagCloud
                harm={move.harm}
                data={move.tags || move.playbook || []}
              />
            </div>
          ))}
        </RowSection>
      </div>
    </div>
  );
}

function RowSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Heading size="sm" className="uppercase tracking-wide">
        {title}
      </Heading>
      {children}
    </div>
  );
}
