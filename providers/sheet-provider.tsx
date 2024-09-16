"use client";

import React from "react";
import { useMountedState } from "react-use";
import ManageInventorySheet from "@/features/items/components/manage-inventory-sheet";
import AddNewItemSheet from "@/features/items/components/add-new-item-sheet";

export default function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <ManageInventorySheet />
      <AddNewItemSheet buttonText="teext" />
    </>
  );
}
