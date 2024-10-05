"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellTooltip } from "../../../components/codex/cells";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import { Paragraph } from "@/components/ui/paragraph";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableColumnHeader from "../../../components/table-column-header";

const columnHelper = createColumnHelper<SelectItems>();

export const itemsColumns = [
  columnHelper.accessor("name", {
    sortingFn: "alphanumeric",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="my-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <Icons.arrowupdown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button onClick={() => row.toggleExpanded()} className="cursor-pointer">
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
  }),

  columnHelper.accessor("type", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="my-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <Icons.arrowupdown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CellTooltip value={row.getValue("type")} translation="motivations" />
      </div>
    ),
  }),

  columnHelper.accessor("description", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="my-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        <Icons.arrowupdown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Paragraph size="xs">{row.getValue("description")}</Paragraph>
    ),
  }),

  columnHelper.accessor((row) => row.tags?.join(","), {
    id: "tags",
    header: ({ column }) => (
      <div className="flex justify-end items-end">
        <TableColumnHeader column={column} title="Tags" />
      </div>
    ),
    cell: ({ row }) => (
      <>
        <TagCloud
          data={row.getValue("tags") as string[]}
          className="flex flex-wrap justify-end"
          visibleTags={3}
          harm={row.original.harm}
          armor={row.original.armor}
        />
      </>
    ),
    enableColumnFilter: true,
    enableGlobalFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const tags = row.getValue(columnId) as string[];
      return tags.some((tag) =>
        tag.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  }),
];
