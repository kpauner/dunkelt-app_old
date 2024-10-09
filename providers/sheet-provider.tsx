"use client";

import React from "react";
import { useMountedState } from "react-use";

import AddNewItemSheet from "@/features/items/components/add-new-item-sheet";
import AddCharacterDialog from "@/features/characters/components/create-character-dialog";
import EditMovesSheet from "@/features/moves/components/edit-moves-sheet";
import EditInventorySheet from "@/features/characters/components/edit-inventory-sheet";
import EditCharacterSheet from "@/features/characters/components/edit-character-sheet";

export default function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <EditInventorySheet />
      <AddNewItemSheet buttonText="teext" />
      <AddCharacterDialog />
      <EditMovesSheet />
      <EditCharacterSheet />
    </>
  );
}
