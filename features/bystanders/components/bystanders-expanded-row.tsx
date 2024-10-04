import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import {
  Asset,
  AssetColumn,
  AssetContent,
  AssetDescription,
  AssetHeader,
  AssetSkills,
  AssetTitle,
} from "@/components/asset";
import TagCloud from "@/components/tag-cloud";
import {
  List,
  ListItem,
  ListTitle,
  ListDescription,
  ListKey,
  ListValue,
} from "@/components/ui/list";
import { Paragraph } from "@/components/ui/paragraph";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { GetBystandersByIdResponseType } from "@/types/bystanders";
import { Avatar } from "@/components/ui/avatar";

type BystandersExpandedRowProps = {
  row: Row<GetBystandersByIdResponseType>;
};

export default function BystandersExpandedRow({
  row,
}: BystandersExpandedRowProps) {
  const t = useTranslations("codex");
  if (!row.original) return null;
  // Example details array, adjust as needed
  const details = [
    {
      label: t("harmCapacity"),
      value: row.original.harmCapacity,
    },
    {
      label: t("armor"),
      value: 1,
    },
    {
      label: t("dateOfBirth"),
      value: row.original.dateOfBirth,
    },
    {
      label: t("dateOfDeath"),
      value: row.original.dateOfDeath,
    },
  ];

  return (
    <Asset variant="default" className="grid grid-cols-2 gap-6">
      <AssetColumn>
        <AssetHeader>
          <AssetTitle
            avatar={row.original.avatar || ""}
            title={row.original.name}
            tags={row.original.type || []}
            type="bystanders"
          />
          <AssetDescription text={row.original.description} />
        </AssetHeader>

        <List>
          {details.map((detail, index) => (
            <ListItem key={index} index={index} horizontal>
              <ListKey>{detail.label}</ListKey>
              <ListValue>
                {Array.isArray(detail.value)
                  ? detail.value.join(", ")
                  : detail.value}
              </ListValue>
            </ListItem>
          ))}
        </List>
        <AssetContent description={row.original.look || "No look found"} />
      </AssetColumn>
      <AssetColumn>
        <AssetContent title="Moves">
          {row.original.bystanderMoves.length > 0 ? (
            row.original.bystanderMoves.map((move) => (
              <AssetSkills
                key={move.id}
                title={move.name}
                description={move.description}
                className="pb-4"
              >
                <TagCloud
                  harm={move.harm}
                  data={move.tags || move.playbook || []}
                />
              </AssetSkills>
            ))
          ) : (
            <Paragraph>No moves found</Paragraph>
          )}
        </AssetContent>
        <AssetContent
          title="History"
          description={row.original.history || "No history found"}
        />
      </AssetColumn>
    </Asset>
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
