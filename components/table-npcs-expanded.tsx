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
import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import { GetNpcsByIdResponseType } from "@/types/npcs";

type NpcsExpandedRowProps = {
  row: Row<GetNpcsByIdResponseType>;
};

export default function NpcsExpandedRow({ row }: NpcsExpandedRowProps) {
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
            avatar={row.original.avatar || ""}
            title={row.original.name}
            tags={row.original.type || []}
            type={row.original.type || "bystander"}
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
        <AssetContent title="Look" description={row.original.look} />

        {/* <pre>{JSON.stringify(row.original, null, 2)}</pre> */}
      </AssetColumn>
      <AssetColumn>
        {row.original.npcMoves && row.original.npcMoves.length > 0 && (
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
        )}
        {row.original.weakness && row.original.weakness.length > 0 && (
          <AssetContent title="Weaknesses">
            {row.original.weakness.map((weak, i) => (
              <AssetSkills
                key={i}
                title={weak.name}
                description={weak.description}
                className="pb-4"
              ></AssetSkills>
            ))}
          </AssetContent>
        )}
        {row.original.history && row.original.history.length > 0 && (
          <AssetContent title="History">
            <Paragraph size="sm" className=" ">
              {row.original.history}
            </Paragraph>
          </AssetContent>
        )}
      </AssetColumn>
    </Asset>
  );
}
