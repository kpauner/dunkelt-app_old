import React, { useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
const columnHelper = createColumnHelper<SelectItems>();

type DataTableProps = {
  data: SelectItems[];
};

export default function InventoryTable({ data }: DataTableProps) {
  const [selectedItem, setSelectedItem] = useState<SelectItems | null>(null);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row, getValue }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => row.toggleExpanded()}
            className="cursor-pointer"
          >
            {row.getIsExpanded() ? <Icons.chevronUp /> : <Icons.chevronDown />}
          </button>
          <span>{getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("tags", {
      header: "Tags",
      cell: (info) => <TagCloud data={info.getValue() || []} />,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
      globalFilter,
    },
    onExpandedChange: (newExpanded) => {
      setExpanded(newExpanded);
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Sheet>
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
      <SheetContent>
        {selectedItem && (
          <div>
            <h2>{selectedItem.name}</h2>
            <p>Type: {selectedItem.type}</p>
            <p>Value: {selectedItem.value}</p>
            <p>Weight: {selectedItem.weight}</p>
            <p>Rarity: {selectedItem.rarity}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </SheetContent>
    </Sheet>
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
        {item?.description && <p>{item.description}</p>}
      </div>

      <TagCloud data={item.tags || []} showAllTags={true} harm={item.harm} />
    </div>
  );
};
