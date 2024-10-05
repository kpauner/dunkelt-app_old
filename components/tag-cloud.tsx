import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

type TagCloudProps = {
  data?: string | string[];
  className?: string;
  visibleTags?: number;
  showAllTags?: boolean;
  harm?: number | null;
  armor?: number | null;
};

export default function TagCloud({
  data,
  visibleTags = 3,
  className,
  showAllTags = false,
  harm,
  armor,
}: TagCloudProps) {
  const t = useTranslations("tags");

  const tagsArray = data
    ? (typeof data === "string" ? data.split(",") : data)
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    : [];

  const displayItems = showAllTags
    ? tagsArray
    : tagsArray.slice(0, visibleTags);
  const remainingCount = showAllTags
    ? 0
    : Math.max(tagsArray.length - visibleTags, 0);

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {harm !== undefined && harm !== null && harm > 0 && (
        <Badge variant="destructive">{harm}-harm</Badge>
      )}
      {armor !== undefined && armor !== null && armor > 0 && (
        <Badge variant="outline">{armor}-armor</Badge>
      )}
      {displayItems.map((item) => {
        const tagName = t(`${item}.name`);
        const tagDescription = t(`${item}.description`);
        return (
          <>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" key={item} className="capitalize">
                  {tagName}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tagDescription}</p>
              </TooltipContent>
            </Tooltip>
          </>
        );
      })}
      {!showAllTags && remainingCount > 0 && (
        <Badge variant="outline">+{remainingCount} more</Badge>
      )}
    </div>
  );
}
