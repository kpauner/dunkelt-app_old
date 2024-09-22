"use client";

import React from "react";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import TableData from "@/components/table-data";
import { useGetBestiaries } from "@/features/bestiary/queries/use-get-bestiaries";

export default function Bestiary() {
  const { data: bestiariesQuery, isLoading, error } = useGetBestiaries();

  return (
    <>
      <TableData
        data={bestiariesQuery || []}
        columns={bestiaryColumns}
        isLoading={isLoading}
        expandedRowType="bestiary"
        pageSize={10}
      />
    </>
  );
}
