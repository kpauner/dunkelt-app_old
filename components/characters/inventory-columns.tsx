"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import { SelectItems } from "@/types/items";
import Heading from "../layout/heading";
import InventoryActions from "@/features/items/components/inventory-actions";

export type InventoryColumnMeta = {
  className?: string;
};
const columnHelper = createColumnHelper<SelectItems>();

export const inventoryColumns = [
  columnHelper.accessor("name", {
    header: () => {
      return (
        <Heading as="h6" size="xs">
          Name
        </Heading>
      );
    },
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
    header: () => {
      return (
        <Heading as="h6" size="xs">
          Tags
        </Heading>
      );
    },
    cell: (info) => (
      <TagCloud
        data={info.row.original.tags || []}
        harm={info.row.original.harm}
        armor={info.row.original.armor}
      />
    ),
    meta: {
      className: "max-w-[180px] ",
    } as InventoryColumnMeta,
  }),
];

export const inventorySheetColumns = [
  columnHelper.accessor("name", {
    header: () => {
      return (
        <Heading as="h6" size="xs">
          Name
        </Heading>
      );
    },
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
    header: () => {
      return (
        <Heading as="h6" size="xs">
          Tags
        </Heading>
      );
    },
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
