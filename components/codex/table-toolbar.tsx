import React from "react";
import { Input } from "../ui/input";
import { Column, Table } from "@tanstack/react-table";
import { filterConfig } from "@/config/filters.config";
import { TableFacetedFilter } from "./table-faceted-filter";
import { TableViewOptions } from "./table-view-options";

interface TableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  filters: filterConfig[];
}

export default function TableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  filters,
}: TableToolbarProps<TData>) {
  console.log("FILTERS", filters);
  const availableFilters = filters.filter((filter) => {
    const column = table
      .getAllColumns()
      .find((col) => col.id === filter.column);
    return column !== undefined;
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter ..."
          value={globalFilter}
          onChange={(e) => {
            console.log("Global filter changed:", e.target.value);
            setGlobalFilter(e.target.value);
          }}
          className="w-full lg:w-80"
        />
        {availableFilters.map((filter) => {
          const column = table.getColumn(filter.column);
          if (column) {
            return (
              <TableFacetedFilter
                key={filter.column}
                column={column as Column<TData, unknown>}
                title={filter.title}
                options={filter.options}
              />
            );
          }
          return null;
        })}
      </div>
      <TableViewOptions table={table} />
    </div>
  );
}
