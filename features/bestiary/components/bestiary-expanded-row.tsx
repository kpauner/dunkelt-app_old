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
      value: row.original.armor,
    },
  ];

  return (
    <Asset variant="default" className="grid grid-cols-2 gap-6">
      <AssetColumn>
        <AssetHeader>
          <AssetTitle
            title={row.original.name}
            tags={row.original.type || []}
            type="bestiary"
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

        <Separator className="dark:bg-primary-foreground " />
        {row.original.npcPowers && row.original.npcPowers.length > 0 && (
          <AssetContent>
            {row.original.npcPowers.map((power) => (
              <AssetSkills
                key={power.name}
                title={power.name}
                description={power.description}
                className="pb-4"
              />
            ))}
          </AssetContent>
        )}
        <pre>{JSON.stringify(row.original, null, 2)}</pre>
      </AssetColumn>
      <AssetColumn>
        <AssetContent title="Moves">
          {row.original.npcMoves.map((move) => (
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
          ))}
        </AssetContent>
        <AssetContent title="Weakness">
          {row.original.weakness && row.original.weakness.length > 0 ? (
            row.original.weakness.map((sign) => (
              <Paragraph key={sign} size="sm" className=" ">
                {sign}
              </Paragraph>
            ))
          ) : (
            <Paragraph size="sm" className=" ">
              {t("noWeakness")}
            </Paragraph>
          )}
        </AssetContent>
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
