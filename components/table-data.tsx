"use client";

import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import TableToolbar from "@/components/codex/table-toolbar";
import { filters } from "@/config/filters.config";
import { DataTablePagination } from "@/components/table-pagination";
import { Paragraph } from "@/components/ui/paragraph";
import TagCloud from "@/components/tag-cloud";
import Heading from "@/components/layout/heading";
import Icons from "@/components/icons";
import { SelectItems } from "@/types/items";
import { InventoryColumnMeta } from "@/components/characters/inventory-columns";
import { cn } from "@/lib/utils";
import {
  BystandersExpandedRow,
  ItemsExpandedRow,
  LocationsExpandedRow,
} from "./expanded-rows";

type DataTableProps<TData, TValue> = {
  columns: any;
  data: TData[];
  expandedRowType: "locations" | "bystanders" | "items";
  className?: string;
  pageSize?: number;
  showFacetedFilter?: boolean;
  showViewOptions?: boolean;
  showRowsPerPage?: boolean;
};

const expandedRowComponents = {
  locations: LocationsExpandedRow,
  bystanders: BystandersExpandedRow,
  items: ItemsExpandedRow,
} as const;

export default function TableData<TData, TValue>({
  columns,
  data,
  expandedRowType,
  className,
  pageSize,
  showFacetedFilter,
  showViewOptions,
  showRowsPerPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: pageSize || 5,
      },
    },
    onExpandedChange: (newExpanded) => {
      setExpanded(newExpanded);
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const ExpandedRowComponent = expandedRowComponents[expandedRowType];

  return (
    <>
      <TableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        filters={filters}
        showFacetedFilter={showFacetedFilter}
        showViewOptions={showViewOptions}
      />

      <Card className={cn("w-full", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="dark:hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          (cell.column.columnDef.meta as InventoryColumnMeta)
                            ?.className
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow className="expanded-content ">
                      <TableCell colSpan={columns.length}>
                        <ExpandedRowComponent row={row.original} />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <DataTablePagination table={table} showRowsPerPage={showRowsPerPage} />
    </>
  );
}

const ExpandedRow = (item: SelectItems) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-x-2">
        <div className="p-px rounded-md flex items-center justify-center border-primary-dark border  aspect-square w-9">
          <Icons.weapon className="w-6 h-6" />
        </div>
        <div>
          <Heading size="xs" className="">
            {item.name}
          </Heading>
          <p className="text-xs text-muted-foreground">{item.type}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {item?.armor !== undefined && item.armor !== null && item.armor > 0 && (
          <div className="flex gap-x-2">
            <span className="font-bold">Armor:</span>
            <span>{item.armor}</span>
          </div>
        )}

        {/* <p>€: {item.value}</p>
              <p>Weight: {item.weight}</p> */}
        {item?.description && (
          <Paragraph variant="default" size="xs">
            {item.description}
          </Paragraph>
        )}
      </div>

      <TagCloud data={item.tags || []} showAllTags={true} harm={item.harm} />
    </div>
  );
};
