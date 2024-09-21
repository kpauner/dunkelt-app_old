import React from "react";
import { getBestiaries } from "@/data-access/bestiary";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icons from "@/components/icons";
import { itemsColumns } from "@/components/codex/items-column";
import placeholderItems from "@/db/seeds/data/items.json";
import TableData from "@/components/table-data";

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
        <TabsContent value="bestiary" className="pt-4">
          <TableData
            data={bestiaries}
            columns={bestiaryColumns}
            expandedRowType="bestiary"
            pageSize={10}
          />
        </TabsContent>
        <TabsContent value="bystanders" className="pt-4">
          <TableData
            data={bestiaries}
            columns={bestiaryColumns}
            expandedRowType="bystanders"
            pageSize={10}
          />
        </TabsContent>
        <TabsContent value="locations" className="pt-4">
          <TableData
            data={placeholderItems}
            columns={itemsColumns}
            expandedRowType="locations"
            pageSize={10}
          />
        </TabsContent>
        <TabsContent value="items" className="pt-4">
          <TableData
            data={placeholderItems}
            columns={itemsColumns}
            expandedRowType="items"
            pageSize={10}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
