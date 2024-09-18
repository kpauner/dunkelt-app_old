import { SelectItems } from "@/types/items";
import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import { Paragraph } from "@/components/ui/paragraph";
import TagCloud from "@/components/tag-cloud";

type LocationsExpandedRowProps = {
  row: any; // Replace with your actual location type
};

export function LocationsExpandedRow({ row }: LocationsExpandedRowProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-x-2">
        <div className="p-px rounded-md flex items-center justify-center border-primary-dark border  aspect-square w-9">
          <Icons.weapon className="w-6 h-6" />
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

        {/* <p>€: {item.value}</p>
              <p>Weight: {item.weight}</p> */}
        {row?.description && (
          <Paragraph variant="default" size="xs">
            {row.description}
          </Paragraph>
        )}
      </div>

      <TagCloud data={row.tags || []} showAllTags={true} harm={row.harm} />
    </div>
  );
}

type BystandersExpandedRowProps = {
  row: any;
};

export function BystandersExpandedRow({
  row: item,
}: BystandersExpandedRowProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      expanded row content for bystanders
    </div>
  );
}
