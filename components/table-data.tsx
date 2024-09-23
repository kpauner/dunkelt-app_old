"use client";

import React from "react";
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import ItemsExpandedRow from "@/features/items/components/items-expanded-row";
import BestiaryExpandedRow from "@/features/bestiary/components/bestiary-expanded-row";
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
import { InventoryColumnMeta } from "@/components/characters/inventory-columns";
import { cn } from "@/lib/utils";
import { BystandersExpandedRow, LocationsExpandedRow } from "./expanded-rows";
import Loader from "./loader";
import { useTranslations } from "next-intl";
import { GetBestiaryByIdResponseType, GetBestiaryResponseType } from "@/types/bestiary";
import { GetItemsResponseType } from "@/types/items";

// Define a mapping of expanded row types to their respective components
const expandedRowComponents = {
  bestiary: BestiaryExpandedRow,
  locations: LocationsExpandedRow,
  bystanders: BystandersExpandedRow,
  items: ItemsExpandedRow,
} as const;

// Define a type that maps expanded row types to their respective props
type ExpandedRowProps<T> = T extends "bestiary"
  ? { row: Row<GetBestiaryByIdResponseType> }
  : T extends "locations"
  ? { row: Row<any> } // Replace LocationType with the actual type
  : T extends "bystanders"
  ? { row: Row<any> } // Replace BystanderType with the actual type
  : T extends "items"
  ? { row: Row<GetItemsResponseType> } // Replace ItemType with the actual type
  : never;

type DataTableProps<TData extends object, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  expandedRowType: keyof typeof expandedRowComponents;
  isLoading?: boolean;
  className?: string;
  pageSize?: number;
  showFacetedFilter?: boolean;
  showViewOptions?: boolean;
  showRowsPerPage?: boolean;
};

export default function TableData<TData extends object, TValue>({
  columns,
  data,
  expandedRowType,
  className,
  isLoading,
  pageSize,
  showFacetedFilter,
  showViewOptions,
  showRowsPerPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const t = useTranslations();

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

  const ExpandedRowComponent = expandedRowComponents[
    expandedRowType
  ] as React.ComponentType<ExpandedRowProps<typeof expandedRowType>>;

  return (
    <div className="flex flex-col gap-2">
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
                    <TableRow className="expanded-content">
                      <TableCell colSpan={columns.length}>
                        <ExpandedRowComponent row={row} />
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
                  {isLoading ? <Loader /> : t("common.no-results")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <DataTablePagination table={table} showRowsPerPage={showRowsPerPage} />
    </div>
  );
}
