"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { GetBestiaryByIdResponseType } from "@/types/bestiary";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CellStringArray, CellTooltip } from "./cells";
import { Paragraph } from "@/components/ui/paragraph";
import { truncateText } from "@/lib/utils";
import Icons from "../icons";
import TagCloud from "../tag-cloud";

export type ColumnMeta = {
  meta: {
    size?: number | string;
    className?: string;
  };
};

const columnHelper = createColumnHelper<GetBestiaryByIdResponseType>();

export const bestiaryColumns = [
  columnHelper.accessor("name", {
    meta: {
      className: "w-64",
    },
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
      <div className="flex items-center gap-2 capitalize">
        <button onClick={() => row.toggleExpanded()} className="cursor-pointer">
          {row.getIsExpanded() ? <Icons.chevronup /> : <Icons.chevrondown />}
        </button>
        <span>{row.getValue("name")}</span>
      </div>
    ),
  }),

  columnHelper.accessor("id", {
    meta: {
      className: "w-36",
    },
    header: ({ column }) => {
      return <span className="">Avatar</span>;
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
  columnHelper.accessor("armor", {
    meta: {
      className: "w-36",
    },
    header: ({ column }) => {
      return <span className="">Armor</span>;
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <TagCloud armor={1} />
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    meta: {
      className: "w-36",
    },
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
    meta: {
      className: "w-[900px]",
    },
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
      <>
        <Paragraph variant="default" size="xs" className="">
          {truncateText(row.getValue("description"), 180)}
        </Paragraph>
      </>
    ),
  }),

  columnHelper.accessor("origins", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Origins
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row, column }) => (
      <div className="flex gap-2 flex-wrap">
        <CellStringArray value={row.getValue("origins")} />
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const origins = row.getValue(id) as string[];
      const filterValues = filterValue as string[];

      if (filterValues.length === 0) return true;

      return origins.some((origin) =>
        filterValues.some(
          (filter) => origin.toLowerCase() === filter.toLowerCase()
        )
      );
    },
    enableHiding: true,
  }),
];
