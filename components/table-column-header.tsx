import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import React from "react";
import Icons from "./icons";

export default function TableColumnHeader({
  column,
  title,
  className,
}: {
  column: Column<any, unknown>;
  title: string;
  className?: string;
}) {
  const t = useTranslations("common");
  const translatedTitle = t(title);
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        className="my-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {translatedTitle}
        <Icons.arrowupdown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
