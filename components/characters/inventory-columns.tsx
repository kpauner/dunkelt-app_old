"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import { SelectItems } from "@/types/items";
import Heading from "../layout/heading";

const columnHelper = createColumnHelper<SelectItems>();
export type InventoryColumnMeta = {
  className?: string;
};

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
          {row.getIsExpanded() ? <Icons.chevronUp /> : <Icons.chevronDown />}
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
      className: "max-w-[140px]",
    } as InventoryColumnMeta,
  }),
];
