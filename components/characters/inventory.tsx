import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type InventoryProps = {
  items: any;
};

export function Inventory({ items }: InventoryProps) {
  const t = useTranslations("tags");
  const displayItems = items.slice(0, 2);
  return (
    <div>
      {/* {JSON.stringify(items)} */}
      <ul>
        {displayItems.map((tag: any) => (
          <li key={tag.id} title={tag.description}>
            {tag.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
