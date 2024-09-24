"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  GetBestiaryByIdResponseType,
  GetBestiaryResponseType,
  SelectBestiary,
} from "@/types/bestiary";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CellStringArray, CellTooltip } from "./cells";
import { Paragraph } from "@/components/ui/paragraph";
import { truncateText } from "@/lib/utils";
import Icons from "../icons";

const columnHelper = createColumnHelper<GetBestiaryByIdResponseType>();

export const bestiaryColumns = [
  columnHelper.accessor("name", {
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
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2">
        <button onClick={() => row.toggleExpanded()} className="cursor-pointer">
          {row.getIsExpanded() ? <Icons.chevronup /> : <Icons.chevrondown />}
        </button>
        <span>{row.getValue("name")}</span>
      </div>
    ),
  }),

  columnHelper.accessor("id", {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="my-1 ">
          Name
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="capitalize font-bold tracking-wider">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover bg-black"
            height="64"
            src="https://static.wikia.nocookie.net/secure-contain-protect/images/b/b6/SCP-049.png/revision/latest?cb=20211121023917"
            width="64"
          />
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("type", {
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
  }),
  columnHelper.accessor("description", {
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
      <Paragraph variant="default" size="xs">
        {truncateText(row.getValue("description"), 180)}
      </Paragraph>
    ),
  }),
  columnHelper.accessor("weakness", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          weakness
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, column }) => (
      <div className="flex gap-2 flex-wrap">
        <CellStringArray value={row.getValue("weakness")} />
      </div>
    ),
  }),
];
