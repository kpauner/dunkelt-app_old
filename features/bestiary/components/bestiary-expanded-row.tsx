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
import { SelectBestiary } from "@/types/bestiary";
import React from "react";

export default function BestiaryExpandedRow({ row }: { row: SelectBestiary }) {
  const details = [
    {
      label: "Harm Capacity",
      value: row.harmCapacity,
    },
    {
      label: "Armor",
      value: row.armor,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <Heading size="sm" className="uppercase tracking-wide">
          {row.name}
        </Heading>
        <TagCloud data={row.type} />
        <Separator className="my-2 h-1 dark:bg-primary" />
        <List>
          {details.map((detail, index) => (
            <ListItem
              className={cn(
                "h-8 px-2 flex items-center justify-between",
                index % 2 === 0 ? "bg-primary-dark" : ""
              )}
              key={detail.label}
            >
              <ListTitle>{detail.label}</ListTitle>
              <ListDescription>{detail.value}</ListDescription>
            </ListItem>
          ))}
        </List>
        <Paragraph size="sm">{row.description}</Paragraph>
      </div>
      <div>
        <Heading size="xs" className="uppercase tracking-wide">
          Attacks
        </Heading>
        <Paragraph size="sm">{row.description}</Paragraph>
        <Heading size="xs" className="uppercase tracking-wide">
          Powers
        </Heading>
        <Paragraph size="sm">{row.description}</Paragraph>
      </div>
    </div>
  );
}
