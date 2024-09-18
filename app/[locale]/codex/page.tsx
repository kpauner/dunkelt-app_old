import React from "react";
import { getBestiaries } from "@/data-access/bestiary";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import TableBestiary from "@/components/codex/table-bestiary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icons from "@/components/icons";
import { itemsColumns } from "@/components/codex/items-column";
import placeholderItems from "@/db/seeds/data/items.json";
import TableItems from "@/features/items/components/table-items";
import TableData from "@/components/table-data";
import {
  BystandersExpandedRow,
  LocationsExpandedRow,
} from "@/components/expanded-rows";

export default async function CodexPage() {
  const bestiaries = await getBestiaries();
  return (
    <>
      <Tabs defaultValue="bestiary">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="bestiary">
              <Icons.monster className="mr-2 h-4 w-4" />
              Bestiary
            </TabsTrigger>
            <TabsTrigger value="bystanders">
              <Icons.bystanders className="mr-2 h-4 w-4" />
              Bystanders
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Icons.location className="mr-2 h-4 w-4" />
              Locations
            </TabsTrigger>
            <TabsTrigger value="items">
              <Icons.item className="mr-2 h-4 w-4" />
              Items
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bestiary" className="space-y-4 pt-4">
          <TableBestiary data={bestiaries} columns={bestiaryColumns} />
        </TabsContent>
        <TabsContent value="items" className="space-y-4 pt-4">
          <TableItems data={placeholderItems} columns={itemsColumns} />
        </TabsContent>
        <TabsContent value="bystanders" className="space-y-4 pt-4">
          <TableData
            data={bestiaries}
            columns={bestiaryColumns}
            expandedRowType="bystanders"
          />
        </TabsContent>
        <TabsContent value="locations" className="space-y-4 pt-4">
          <TableData
            data={placeholderItems}
            columns={itemsColumns}
            expandedRowType="locations"
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
