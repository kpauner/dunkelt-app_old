"use client";

import React from "react";

import TableData from "@/components/table-data";
import { useGetItems } from "@/features/items/queries/use-get-items";
import { itemsColumns } from "./items-column";

export default function Items() {
  const { data: itemsQuery, isLoading, error } = useGetItems();

  return (
    <>
      <TableData
        data={itemsQuery || []}
        columns={itemsColumns}
        isLoading={isLoading}
        expandedRowType="items"
        pageSize={10}
      />
    </>
  );
}
