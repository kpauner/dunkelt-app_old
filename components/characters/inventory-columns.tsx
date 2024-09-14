"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Icons from "@/components/icons";
import TagCloud from "@/components/tag-cloud";
import { SelectItems } from "@/types/items";

const columnHelper = createColumnHelper<SelectItems>();

export const inventoryColumns = [
  columnHelper.accessor("name", {
    header: "Name",
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
    header: "Tags",
    cell: (info) => (
      <TagCloud
        data={info.getValue() || []}
        harm={info.row.original.harm}
        armor={info.row.original.armor}
      />
    ),
  }),
];
