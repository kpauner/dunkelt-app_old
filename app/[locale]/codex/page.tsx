import React from "react";
import { getBestiaries } from "@/data-access/bestiary";
import { bestiaryColumns } from "@/components/codex/bestiary-columns";
import TableBestiary from "@/components/codex/table-bestiary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icons from "@/components/icons";

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
            <TabsTrigger value="active">
              <Icons.bystanders className="mr-2 h-4 w-4" />
              Bystander
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Icons.location className="mr-2 h-4 w-4" />
              Locations
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bestiary">
          <div className="grid w-full gap-6 grid-cols-3 grid-rows-2">
            <TableBestiary data={bestiaries} columns={bestiaryColumns} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
