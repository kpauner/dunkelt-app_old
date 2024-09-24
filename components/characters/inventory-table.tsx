import React, { useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SelectItems } from "@/types/items";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TagCloud from "@/components/tag-cloud";
import { Input } from "@/components/ui/input";
import Icons from "@/components/icons";
import Heading from "@/components/layout/heading";
import { TablePagination } from "../table-pagination";
import { Paragraph } from "../ui/paragraph";

const columnHelper = createColumnHelper<SelectItems>();
type InventoryColumns = ReturnType<typeof columnHelper.accessor>[];

type InventoryTableProps = {
  data: SelectItems[];
  columns: any;
};

export default function InventoryTable({ data, columns }: InventoryTableProps) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5, // Set your desired default page size here
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onExpandedChange: (newExpanded) => {
      setExpanded(newExpanded);
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div>
      <Input
        placeholder="Filter ..."
        value={globalFilter}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
        }}
        className="w-full "
      />
      <Table>
        <TableHeader className="text-xs uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-xs">
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {row.getIsExpanded() && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <ExpandedRow {...row.original} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <TablePagination table={table} showRowsPerPage={false} />
    </div>
  );
}

const ExpandedRow = (item: SelectItems) => {
  return (
    <div className="flex flex-col gap-4">
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
