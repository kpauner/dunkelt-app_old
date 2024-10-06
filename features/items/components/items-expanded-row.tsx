import {
  Asset,
  AssetColumn,
  AssetContent,
  AssetDescription,
  AssetHeader,
  AssetTitle,
} from "@/components/asset";
import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import TagCloud from "@/components/tag-cloud";
import { Separator } from "@/components/ui/separator";
import { Paragraph } from "@/components/ui/paragraph";
import { Row } from "@tanstack/react-table";

type ItemsExpandedRowProps = {
  row: Row<any>;
};

export default function ItemsExpandedRow({ row }: ItemsExpandedRowProps) {
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

        <Separator className="dark:bg-primary-foreground" />

        <TagCloud
          data={row.original.tags || []}
          showAllTags={true}
          harm={row.original.harm}
          armor={row.original.armor}
        />
      </AssetColumn>
      <AssetColumn>
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
