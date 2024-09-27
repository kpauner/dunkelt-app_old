"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { GetBestiaryByIdResponseType } from "@/types/bestiary";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Paragraph } from "@/components/ui/paragraph";
import { truncateText } from "@/lib/utils";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import TableColumnHeader from "@/components/table-column-header";
import { CellStringArray } from "@/components/codex/cells";

export type ColumnMeta = {
  meta: {
    size?: number | string;
    className?: string;
  };
};

const columnHelper = createColumnHelper<GetBestiaryByIdResponseType>();

export const locationsColumns = [
  columnHelper.accessor("name", {
    meta: {
      className: "w-64",
    },
    header: ({ column }) => {
      return <TableColumnHeader column={column} title="Name" />;
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
    meta: {
      className: "w-30",
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

  columnHelper.accessor("type", {
    meta: {
      className: "w-36",
    },
    header: ({ column }) => {
      return <TableColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      const typeValues = row.getValue("type") as string[];

      if (!typeValues) {
        return null;
      }
      return <TagCloud data={typeValues} showAllTags={true} />;
    },
    filterFn: (row, id, filterValues) => {
      const rowValues = row.getValue(id) as string[];
      return rowValues.some((value) => filterValues.includes(value));
    },
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  }),
];
