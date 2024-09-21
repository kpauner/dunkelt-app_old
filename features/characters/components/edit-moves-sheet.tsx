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

export default function EditMovesSheet() {
  const { isOpen, onOpen, onClose } = useEditMovesSheet();
  const { character } = useCharacterStore();
  // const { data: moves, isLoading, error } = useGetMoves();

  const t = useTranslations("features.moves");
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
