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

import { useEditInventorySheet } from "@/features/characters/hooks/use-edit-inventory-sheet";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import TableItems from "@/features/items/components/table-items";
import { useGetItems } from "@/features/items/queries";
import Loader from "@/components/loader";
import {
  inventoryColumns,
  inventorySheetColumns,
} from "@/components/characters/inventory-columns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function EditInventorySheet() {
  const { isOpen, onOpen, onClose } = useEditInventorySheet();
  const { character } = useCharacterStore();
  const { data: items, isLoading, error } = useGetItems();

  const t = useTranslations("inventory");
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
        <Accordion type="multiple" defaultValue={["add-item"]}>
          <AccordionItem value="add-item" className="">
            <AccordionTrigger>Add item</AccordionTrigger>
            <AccordionContent className="py-4">
              {isLoading ? (
                <Loader />
              ) : (
                <TableItems
                  data={items || []}
                  columns={inventorySheetColumns as any}
                  // className="bg-none border-none p-0 dark:bg-transparent"
                  showFacetedFilter={false}
                  showViewOptions={true}
                  showRowsPerPage={false}
                />
              )}
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
