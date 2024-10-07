"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CellTooltip } from "@/components/codex/cells";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import { Paragraph } from "@/components/ui/paragraph";
import TableColumnHeader from "@/components/table-column-header";

const columnHelper = createColumnHelper<SelectItems>();

export const itemsColumns = [
  columnHelper.accessor("name", {
    sortingFn: "alphanumeric",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        <button onClick={() => row.toggleExpanded()} className="cursor-pointer">
          {row.getIsExpanded() ? <Icons.chevronup /> : <Icons.chevrondown />}
        </button>
        <span>{row.getValue("name")}</span>
      </div>
    ),
  }),

  columnHelper.accessor("type", {
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CellTooltip value={row.getValue("type")} translation="motivations" />
      </div>
    ),
  }),

  columnHelper.accessor("description", {
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
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
