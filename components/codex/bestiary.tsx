"use client";

import React from "react";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import TableData from "@/components/table-data";
import { useGetBestiaries } from "@/features/bestiary/queries/use-get-bestiaries";
import {
  GetBestiaryByIdResponseType,
  GetBestiaryResponseType,
} from "@/types/bestiary";

export default function Bestiary() {
  const { data: bestiariesQuery, isLoading, error } = useGetBestiaries();

  return (
    <>
      <TableData
        data={(bestiariesQuery as GetBestiaryResponseType) || []}
        columns={bestiaryColumns}
        isLoading={isLoading}
        expandedRowType="bestiary"
      />
    </>
  );
}
