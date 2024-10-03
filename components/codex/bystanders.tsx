"use client";

import React from "react";
import TableData from "@/components/table-data";
import { useGetBystanders } from "@/features/bystanders/queries/use-get-bystanders";
import { GetBystandersResponseType } from "@/types/bystanders";
import { bystandersColumns } from "./bystanders-columns";

export default function Bystanders() {
  const { data: bystandersQuery, isLoading, error } = useGetBystanders();

  return (
    <>
      <TableData
        data={(bystandersQuery as GetBystandersResponseType) || []}
        columns={bystandersColumns}
        isLoading={isLoading}
        expandedRowType="bystanders"
        initialColumnVisibility={{
          origins: true,
          armor: false,
        }}
      />
    </>
  );
}
