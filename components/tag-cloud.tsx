import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type TagCloudProps = {
  value: string[];
  className?: string;
  visibleTags?: number;
};

export default function TagCloud({
  value,
  visibleTags = 3,
  className,
}: TagCloudProps) {
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
