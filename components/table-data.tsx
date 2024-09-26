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
import LocationsExpandedRow from "@/features/locations/components/locations-expanded-row";
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
import { filtersConfig } from "@/config/filters.config";
import { TablePagination } from "@/components/table-pagination";
import { cn } from "@/lib/utils";
import { BystandersExpandedRow } from "./expanded-rows";
import Loader from "./loader";
import { useTranslations } from "next-intl";
import {
  GetBestiaryByIdResponseType,
  GetBestiaryResponseType,
} from "@/types/bestiary";
import { SelectItemsResponseType } from "@/types/items";
import { ColumnMeta } from "./codex/bestiary-columns";

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
  ? { row: Row<SelectItemsResponseType> } // Replace ItemType with the actual type
  : never;

type DataTableProps<TData extends object, TValue> = {
  columns: any;
  data: TData[];
  expandedRowType: keyof typeof expandedRowComponents;
  isLoading?: boolean;
  className?: string;
  pageSize?: number;
  showFacetedFilter?: boolean;
  showViewOptions?: boolean;
  showRowsPerPage?: boolean;
  initialColumnVisibility?: Record<string, boolean>;
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
  initialColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const t = useTranslations();

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: false,
    state: {
      expanded,
      globalFilter,
      sorting,
    },
    initialState: {
      columnVisibility: initialColumnVisibility,
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
        filters={filtersConfig[expandedRowType] || []}
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
                        style={{
                          width: (cell.column.columnDef as ColumnMeta)?.meta
                            ?.size,
                        }}
                        className={cn(
                          "overflow-hidden",
                          (cell.column.columnDef as ColumnMeta)?.meta?.className
                        )}
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

      <TablePagination table={table} showRowsPerPage={showRowsPerPage} />
    </div>
  );
}
