import Heading from "@/components/layout/heading";
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
      <div className="space-y-3">
        <Heading size="sm" className="uppercase tracking-wide">
          {row.original.name}
        </Heading>
        <TagCloud data={row.original.type} />
        <Separator className="my-2 h-1 dark:bg-primary" />

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
        <RowSection title={t("description")} text={row.original.description} />
      </div>
      <div>
        <RowSection title={t("description")} text={row.original.description} />
        <pre>{JSON.stringify(row.original, null, 2)}</pre>
      </div>
    </div>
  );
}

function RowSection({
  title,
  text,
}: {
  title: string;
  text: string | string[] | null;
}) {
  return (
    <div className="pt-8 space-y-2">
      <Heading size="xs" className="uppercase tracking-wide">
        {title}
      </Heading>
      <Paragraph size="sm">{text}</Paragraph>
    </div>
  );
}
