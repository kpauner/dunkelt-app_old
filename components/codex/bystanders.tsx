"use client";

import React from "react";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import TableData from "@/components/table-data";
import { useGetBystanders } from "@/features/bystanders/queries/use-get-bystanders";
import { GetBystandersResponseType } from "@/types/bystanders";

export default function Bystanders() {
  const { data: bystandersQuery, isLoading, error } = useGetBystanders();

  return (
    <>
      <TableData
        data={(bystandersQuery as GetBystandersResponseType) || []}
        columns={bestiaryColumns}
        isLoading={isLoading}
        expandedRowType="bystanders"
        initialColumnVisibility={{
          origins: true,
        }}
      />
    </>
  );
}
