"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { inventoryColumns } from "@/components/characters/inventory-columns";
import useCharacterStore from "@/features/characters/hooks/use-character-store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import ItemForm from "./item-form";
// import TableItems from "./table-items";
// import { useGetMoves } from "@/features/moves/queries";
import Loader from "@/components/loader";
import { useEditMovesSheet } from "../hooks/use-edit-moves-sheet";
import TableData from "@/components/table-data";
import { itemsColumns } from "@/components/codex/items-column";
import placeholderItems from "@/db/seeds/data/items.json";

export default function EditMovesSheet() {
  const { isOpen, onOpen, onClose } = useEditMovesSheet();
  const { character } = useCharacterStore();
  // const { data: moves, isLoading, error } = useGetMoves();

  const t = useTranslations("moves");
  const c = useTranslations("common");

  function handleSubmit(values: any) {
    console.log(values);
  }

  function handleDelete(values: any) {
    console.log(values);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        <Accordion type="multiple" defaultValue={["items"]}>
          <AccordionItem value="items">
            <AccordionTrigger>{t("title")}</AccordionTrigger>
            <AccordionContent className="py-4">
              <TableData
                data={placeholderItems}
                columns={inventoryColumns}
                expandedRowType="items"
                pageSize={5}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="add-item" className="">
            <AccordionTrigger>Add item</AccordionTrigger>
            <AccordionContent className="py-4">
              {/* {isLoading ? (
                <Loader />
              ) : (
                <TableItems
                  data={items || []}
                  columns={inventoryColumns as any}
                  className="bg-none border-none p-0 dark:bg-transparent"
                  showFacetedFilter={false}
                  showViewOptions={false}
                  showRowsPerPage={false}
                />
              )} */}
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="create-item">
            <AccordionTrigger className="bg-muted px-2">
              Create item
            </AccordionTrigger>
            <AccordionContent className="py-2">
              <ItemForm onSubmit={() => {}} disabled={false} />
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" type="submit">
              {c("close")}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
