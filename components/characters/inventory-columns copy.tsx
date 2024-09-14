"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellDescriptions, CellTooltip } from "@/components/codex/cells";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";

export const InventoryColumns: ColumnDef<SelectItems>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <Icons.arrowupdown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1 "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <Icons.arrowupdown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            row.toggleExpanded();
          }}
          className="cursor-pointer"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        <span className="capitalize font-bold tracking-wider">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CellTooltip value={row.getValue("type")} translation="motivations" />
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, column }) => (
      <div className="flex items-center gap-2">
        <CellDescriptions column={column} value={row.getValue("description")} />
      </div>
    ),
  },
  {
    accessorFn: (row) => row.tags?.join(","), // Join tags with a separator
    id: "tags",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          tags
          <Icons.arrowupdown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, column }) => {
      return (
        <div className="flex gap-2 flex-wrap">
          <TagCloud data={row.getValue("tags") as string[]} visibleTags={3} />
        </div>
      );
    },
    enableGlobalFilter: true,
  },
];
