"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CellDescriptions, CellTooltip } from "@/components/codex/cells";
import Icons from "../icons";
import TagCloud from "../tag-cloud";

export type Item = {
  id: number;
  name: string;
  description: string | null;
  type: string;
  value: number | null;
  tags: string[] | null;
  weight: number | null;
  rarity: string | null;
  notes: string | null;
};

const columnHelper = createColumnHelper<Item>();

export const InventoryColumns = [
  columnHelper.accessor("id", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <Icons.arrowupdown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("value", {
    header: "Value",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("weight", {
    header: "Weight",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("rarity", {
    header: "Rarity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tags", {
    header: "Tags",
    cell: (info) => (
      <TagCloud data={info.getValue() as string[]} visibleTags={3} />
    ),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("notes", {
    header: "Notes",
    cell: (info) => info.getValue(),
  }),
];
