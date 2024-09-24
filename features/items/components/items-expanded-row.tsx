import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import TagCloud from "@/components/tag-cloud";
import { Paragraph } from "@/components/ui/paragraph";
import { Row } from "@tanstack/react-table";

type ItemsExpandedRowProps = {
  row: Row<any>;
};

export default function ItemsExpandedRow({ row }: ItemsExpandedRowProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-x-2">
        <div className="p-px rounded-md flex items-center justify-center border-primary-dark border  aspect-square w-9">
          <Icons.items className="w-6 h-6" />
        </div>
        <div>
          <Heading size="xs" className="">
            {row.original.name}
          </Heading>
          <p className="text-xs text-muted-foreground">{row.original.type}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {row?.original?.armor !== undefined &&
          row?.original?.armor !== null &&
          row?.original?.armor > 0 && (
            <div className="flex gap-x-2">
              <span className="font-bold">Armor:</span>
              <span>{row.original.armor}</span>
            </div>
          )}

        {row?.original?.description && (
          <Paragraph variant="default" size="xs">
            {row.original.description}
          </Paragraph>
        )}
      </div>

      <TagCloud
        data={row.original.tags || []}
        showAllTags={true}
        harm={row.original.harm}
        armor={row.original.armor}
      />
    </div>
  );
}
