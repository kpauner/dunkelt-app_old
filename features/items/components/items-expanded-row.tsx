import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import TagCloud from "@/components/tag-cloud";
import { Paragraph } from "@/components/ui/paragraph";

export default function ItemsExpandedRow({ row }: { row: any }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-x-2">
        <div className="p-px rounded-md flex items-center justify-center border-primary-dark border  aspect-square w-9">
          <Icons.items className="w-6 h-6" />
        </div>
        <div>
          <Heading size="xs" className="">
            {row.name}
          </Heading>
          <p className="text-xs text-muted-foreground">{row.type}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {row?.armor !== undefined && row.armor !== null && row.armor > 0 && (
          <div className="flex gap-x-2">
            <span className="font-bold">Armor:</span>
            <span>{row.armor}</span>
          </div>
        )}

        {row?.description && (
          <Paragraph variant="default" size="xs">
            {row.description}
          </Paragraph>
        )}
      </div>

      <TagCloud
        data={row.tags || []}
        showAllTags={true}
        harm={row.harm}
        armor={row.armor}
      />
    </div>
  );
}
