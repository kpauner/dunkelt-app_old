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
import {
  inventoryColumns,
  inventorySheetColumns,
} from "@/components/characters/inventory-columns";
import useCharacterStore from "@/features/characters/hooks/use-character-store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import ItemForm from "./item-form";
// import { useGetMoves } from "@/features/moves/queries";
import Loader from "@/components/loader";
import { useEditMovesSheet } from "@/features/moves/hooks/use-edit-moves-sheet";
import TableData from "@/components/table-data";
import { useGetMoves } from "../queries/use-get-moves";

export default function EditMovesSheet() {
  const { isOpen, onOpen, onClose } = useEditMovesSheet();
  const { character } = useCharacterStore();
  const { data: moves, isLoading, error } = useGetMoves();

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
          <SheetTitle>{t("label")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        <TableData
          data={moves || []}
          expandedRowType="items"
          columns={inventorySheetColumns as any}
          isLoading={false}
          showFacetedFilter={false}
          showViewOptions={true}
          showRowsPerPage={false}
          pageSize={5}
        />

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
