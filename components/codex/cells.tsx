import React, { useState } from "react";
import { Column, Row } from "@tanstack/react-table";
// import { format } from "date-fns";
import { cn, truncateText } from "@/lib/utils";
import { Badge } from "../ui/badge";

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
  const displayItems = value.slice(0, 3);
  const remainingCount = value.length - 3;

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
