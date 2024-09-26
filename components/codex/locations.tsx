"use client";

import React from "react";

import { useGetLocations } from "@/features/locations/queries/use-get-bestiaries";
import TableData from "@/components/table-data";
import { locationsColumns } from "@/features/locations/components/locations-columns";

export default function Locations() {
  const { data: locationsQuery, isLoading, error } = useGetLocations();

  return (
    <>
      <TableData
        data={locationsQuery || []}
        columns={locationsColumns}
        isLoading={isLoading}
        expandedRowType="locations"
        initialColumnVisibility={{
          origins: true,
          // ... other columns
        }}
        pageSize={10}
      />
    </>
  );
}
