"use client";

import React from "react";
import { bestiaryColumns } from "@/features/bestiary/components/bestiary-columns";
import { useGetBestiaries } from "@/features/bestiary/queries/use-get-bestiaries";
import { GetBestiaryResponseType } from "@/types/bestiary";
import TableData from "@/components/table-data";

export default function Bestiary() {
  const { data: bestiariesQuery, isLoading, error } = useGetBestiaries();

  return (
    <TableData
      data={(bestiariesQuery as GetBestiaryResponseType) || []}
      columns={bestiaryColumns}
      isLoading={isLoading}
      expandedRowType="bestiary"
      initialColumnVisibility={{
        origins: true,
      }}
    />
  );
}
