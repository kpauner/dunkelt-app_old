"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import { SelectItems } from "@/types/items";
import Heading from "../layout/heading";
import InventoryActions from "@/features/items/components/inventory-actions";
import TableColumnHeader from "../table-column-header";

export type InventoryColumnMeta = {
  className?: string;
};
const columnHelper = createColumnHelper<SelectItems>();

export const inventoryColumns = [
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

export const inventorySheetColumns = [
  columnHelper.accessor("name", {
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,

    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2">
        <button onClick={() => row.toggleExpanded()} className="cursor-pointer">
          {row.getIsExpanded() ? <Icons.chevronup /> : <Icons.chevrondown />}
        </button>
        <span>{getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("tags", {
    header: ({ column }) => <TableColumnHeader column={column} title="Tags" />,
    cell: (info) => (
      <TagCloud
        data={info.getValue() || []}
        harm={info.row.original.harm}
        armor={info.row.original.armor}
      />
    ),
    meta: {
      className: "max-w-36",
    } as InventoryColumnMeta,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      return <InventoryActions row={row.original} />;
    },
    meta: {
      className: "w-36",
    } as InventoryColumnMeta,
  }),
];
