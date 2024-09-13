"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CellDescriptions, CellStringArray, CellTooltip } from "./cells";
import Icons from "../icons";
import TagCloud from "../tag-cloud";

export const itemsColumns: ColumnDef<SelectItems>[] = [
  {
    accessorFn: (row) => row.name.toLowerCase(),
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
            console.log("Row expanded state:", row.getIsExpanded());
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
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" className="my-1 ">
  //         image
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-2">
  //       <span className="capitalize font-bold tracking-wider">
  //         <Image
  //           alt="Product image"
  //           className="aspect-square rounded-md object-cover bg-black"
  //           height="64"
  //           src="https://static.wikia.nocookie.net/secure-contain-protect/images/b/b6/SCP-049.png/revision/latest?cb=20211121023917"
  //           width="64"
  //         />
  //       </span>
  //     </div>
  //   ),
  // },
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
    accessorKey: "tags",
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
  },
];
