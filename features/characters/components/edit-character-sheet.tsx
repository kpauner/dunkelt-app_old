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
import CharacterForm, { CharacterFormValues } from "./character-form";
import { useCreateCharacter } from "../queries/use-create-character";

export default function EditCharacterSheet() {
  const { isOpen, onOpen, onClose } = useEditCharacterSheet();
  const { character } = useCharacterStore();
  const mutation = useCreateCharacter();

  function onSubmit(values: CharacterFormValues) {
    mutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  }
  const t = useTranslations("moves");
  const c = useTranslations("common");

  function handleSubmit(values: any) {
    console.log(values);
  }

  function handleDelete() {
    console.log("delete");
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("label")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        <CharacterForm
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          disabled={mutation.isPending}
          id={character?.id}
          defaultValues={{
            name: character?.name || "",
            pronouns: character?.pronouns || "",
            look: character?.look || "",
            playbook: character?.playbook || "",
            userId: character?.userId || "",
            dateOfBirth: character?.dateOfBirth || "",
            dateOfDeath: character?.dateOfDeath || "",
          }}
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
