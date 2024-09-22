"use client";

import React from "react";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icons from "@/components/icons";
import TableData from "@/components/table-data";
import { useGetBestiaries } from "@/features/bestiary/queries/use-get-bestiaries";
import { useGetItems } from "@/features/items/queries";
import { itemsColumns } from "./items-column";

export default function CodexPage() {
  const { data: bestiariesQuery, isLoading, error } = useGetBestiaries();
  // const { data: bystandersQuery, isLoading: isLoadingBystanders, error: errorBystanders } = useGetBystanders();
  // const { data: locationsQuery, isLoading: isLoadingLocations, error: errorLocations } = useGetLocations();
  const {
    data: itemsQuery,
    isLoading: isLoadingItems,
    error: errorItems,
  } = useGetItems();

  return (
    <>
      <Tabs defaultValue="bestiary">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="bestiary">
              <Icons.bestiary className="mr-2 h-4 w-4" />
              Bestiary
            </TabsTrigger>
            <TabsTrigger value="bystanders">
              <Icons.bystanders className="mr-2 h-4 w-4" />
              Bystanders
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Icons.locations className="mr-2 h-4 w-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="items">
              <Icons.items className="mr-2 h-4 w-4" />
              Items
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bestiary" className="pt-4">
          <TableData
            data={bestiariesQuery || []}
            columns={bestiaryColumns}
            isLoading={isLoading}
            expandedRowType="bestiary"
            pageSize={10}
          />
        </TabsContent>
        {/* <TabsContent value="bystanders" className="pt-4">
          <TableData
            data={bestiaries}
            columns={bestiaryColumns}
            expandedRowType="bystanders"
            pageSize={10}
          />
        </TabsContent> */}
        {/* <TabsContent value="locations" className="pt-4">
          <TableData
            data={placeholderItems}
            columns={itemsColumns}
            expandedRowType="locations"
            pageSize={10}
          />
        </TabsContent> */}
        <TabsContent value="items" className="pt-4">
          <TableData
            data={itemsQuery || []}
            columns={itemsColumns}
            expandedRowType="items"
            pageSize={10}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
