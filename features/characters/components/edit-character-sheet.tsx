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
import TableData from "@/components/table-data";
import { useEditCharacterSheet } from "../hooks/use-edit-character-sheet";
import { EditCharacterForm } from "./edit-character-form";

export default function EditCharacterSheet() {
  const { isOpen, onOpen, onClose } = useEditCharacterSheet();
  const { character } = useCharacterStore();

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
        <EditCharacterForm />
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
