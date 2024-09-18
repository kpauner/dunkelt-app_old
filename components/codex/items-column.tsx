"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellTooltip } from "./cells";
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
      <Button
        variant="ghost"
        className="my-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        tags
        <Icons.arrowupdown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 flex-wrap">
        <TagCloud data={row.getValue("tags") as string[]} visibleTags={3} />
      </div>
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
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id.toString())}
            >
              Copy item ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("View details", item)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit item", item)}>
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];
