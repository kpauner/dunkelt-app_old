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
            <Item item={tag} />
            {tag.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Item({ item }: { item: any }) {
  const t = useTranslations("tags");

  const tagIds = item.tags ? item.tags.split(",") : [];

  // console.log(t("messy.description"));
  console.log(t.raw("messy.description"));

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <ul>
        {tagIds.map((tagId: any) => (
          <li key={tagId} title={t(`${tagId}.description`)}>
            {t(`${tagId}.name`)}
          </li>
        ))}
      </ul>
    </div>
  );
}

type ItemTagCloudProps = {
  value: string[];
  className?: string;
  visibleTags?: number;
};

function ItemTagCloud({
  value,
  visibleTags = 3,
  className,
}: ItemTagCloudProps) {
  const displayItems = value.slice(0, visibleTags);
  const remainingCount = value.length - visibleTags;

  return (
    <div className="flex flex-wrap gap-1">
      {displayItems.map((item) => (
        <Badge variant="secondary" key={item} className={cn("", className)}>
          {item}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" className={cn("", className)}>
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
}
