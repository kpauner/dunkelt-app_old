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
  data: string | string[];
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
  if (!data || data.length === 0) {
    return null;
  }
  const tagsArray =
    typeof data === "string" ? data.split(",") : (data as string[]);

  // Filter out empty strings and trim whitespace
  const cleanedTags = tagsArray
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");

  if (cleanedTags.length === 0) {
    return null;
  }

  const displayItems = showAllTags
    ? cleanedTags
    : cleanedTags.slice(0, visibleTags);
  const remainingCount = showAllTags
    ? 0
    : Math.max(cleanedTags.length - visibleTags, 0);

  return (
    <div className="flex flex-wrap gap-1">
      {harm !== undefined && harm !== null && harm > 0 && (
        <Badge className={cn("inline-block", className)} variant="destructive">
          {harm}-harm
        </Badge>
      )}
      {armor !== undefined && armor !== null && armor > 0 && (
        <Badge className={cn("inline-block", className)} variant="outline">
          {armor}-armor
        </Badge>
      )}
      {displayItems.map((item) => {
        const tagName = t(`${item}.name`);
        const tagDescription = t(`${item}.description`);
        return (
          <>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  key={item}
                  className={cn("capitalize", className)}
                >
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
        <Badge variant="outline" className={cn("", className)}>
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
}
