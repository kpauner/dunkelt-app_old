import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import {
  Asset,
  AssetColumn,
  AssetDescription,
  AssetHeader,
  AssetTitle,
} from "@/components/asset";
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
import {
  SelectLocationResponseType,
  SelectLocationsResponseType,
} from "@/types/locations";

type LocationsExpandedRowProps = {
  row: Row<SelectLocationResponseType>;
};

export default function LocationsExpandedRow({
  row,
}: LocationsExpandedRowProps) {
  const t = useTranslations("bestiary");
  if (!row.original) return null;
  // Example details array, adjust as needed
  // const details = [
  //   {
  //     label: t("harmCapacity"),
  //     value: row.original.harmCapacity,
  //   },
  //   {
  //     label: t("armor"),
  //     value: row.original.armor,
  //   },
  //   {
  //     label: t("origins"),
  //     value: row.original.origins,
  //   },
  // ];

  return (
    <Asset variant="default" className="grid grid-cols-2 gap-6">
      <AssetColumn>
        <AssetHeader>
          <AssetTitle
            title={row.original.name}
            tags={row.original.type || []}
            type="locations"
          />
          <AssetDescription text={row.original.description} />
        </AssetHeader>
        <Separator className="dark:bg-primary-foreground" />
        <RowSection title="Suggestions">
          <Paragraph size="sm" className=" ">
            <strong className="font-bold text-primary-foreground">
              Hellgate:
            </strong>{" "}
            When it commands you, roll +Cool. On a 10+, you can choose whether
            to do it or not. If you do, mark experience and take +1 forward. On
            a 7-9, you can choose whether you do it or not.
          </Paragraph>
          <Paragraph size="sm" className=" ">
            <strong className="font-bold text-primary-foreground">
              Fortress:
            </strong>{" "}
            When it commands you, roll +Cool. On a 10+, you can choose whether
            to do it or not. If you do, mark experience and take +1 forward. On
            a 7-9, you can choose whether you do it or not.
          </Paragraph>
        </RowSection>
      </AssetColumn>

      <AssetColumn>
        <RowSection title="Moves">
          {row.original.locationMoves.map((move) => (
            <div key={move.id} className="space-y-2">
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
        <RowSection title="History">
          <Paragraph size="sm" className=" ">
            {row.original.history}
          </Paragraph>
        </RowSection>
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
      <Heading size="sm" className="uppercase tracking-wide pt-0">
        {title}
      </Heading>
      {children}
    </div>
  );
}
