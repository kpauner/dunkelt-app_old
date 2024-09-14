import React, { useState } from "react";
import { cn, truncateText } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslations } from "next-intl";
import TagCloud from "../tag-cloud";

type CellHeaderProps = {
  column: any;
  value: any;
  className?: string;
};

export function CellHeader({ column, value, className }: CellHeaderProps) {
  return (
    <div
      className={cn("px-2 py-1.5", className)}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {value}
    </div>
  );
}

type CellDescriptionsProps = {
  column?: any;
  value: string;
  className?: string;
};

export function CellDescriptions({
  column,
  value,
  className,
}: CellDescriptionsProps) {
  const text = truncateText(value, 100);
  return <div className={cn("px-2 py-1.5", className)}>{text}</div>;
}

type CellStringArrayProps = {
  value: string[];
  className?: string;
};

export function CellStringArray({ value, className }: CellStringArrayProps) {
  return <TagCloud data={value} visibleTags={3} className={className} />;
}

type CellTooltipProps = {
  value: string;
  translation: string;
  className?: string;
};

export function CellTooltip({
  value,
  translation,
  className,
}: CellTooltipProps) {
  const t = useTranslations(translation);

  const lowerCaseValue = value.toLowerCase();
  const translatedValue = t(lowerCaseValue);

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="secondary" className={cn("capitalize", className)}>
          {value}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t(value)}</p>
      </TooltipContent>
    </Tooltip>
  );
}
