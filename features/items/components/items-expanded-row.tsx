"use client";

import {
  Asset,
  AssetColumn,
  AssetContent,
  AssetDescription,
  AssetHeader,
  AssetTitle,
} from "@/components/asset";
import TagCloud from "@/components/tag-cloud";
import { Paragraph } from "@/components/ui/paragraph";
import { Row } from "@tanstack/react-table";
import { usePathname } from "next/navigation";

type ItemsExpandedRowProps = {
  row: Row<any>;
};

export default function ItemsExpandedRow({ row }: ItemsExpandedRowProps) {
  const path = usePathname();
  const isItems = path.includes("items");
  return (
    <Asset variant="default" type="row">
      <AssetColumn className="flex-1">
        <AssetHeader>
          <AssetTitle
            avatar={row.original.avatar || ""}
            title={row.original.name}
            tags={row.original.type || []}
            type={row.original.type || "item"}
          />
          <AssetDescription text={row.original.description} />
        </AssetHeader>

        <TagCloud
          data={row.original.tags || []}
          showAllTags={true}
          harm={row.original.harm}
          armor={row.original.armor}
        />
      </AssetColumn>
      {isItems && (
        <AssetColumn className="flex-1">
          {row.original.history && row.original.history.length > 0 && (
            <AssetContent title="History">
              <Paragraph size="sm" className=" ">
                {row.original.history}
              </Paragraph>
            </AssetContent>
          )}
        </AssetColumn>
      )}
    </Asset>
  );
}
