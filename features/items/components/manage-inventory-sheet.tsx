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
import { useManageInventory } from "../hooks/use-manage-inventory-store";
import InventoryTable from "./inventory-table";
import { inventoryColumns } from "@/components/characters/inventory-columns";
import useCharacterStore from "@/features/characters/hooks/use-character-store";

export default function ManageInventorySheet() {
  const { isOpen, onOpen, onClose, characterId } = useManageInventory();
  const t = useTranslations("features.items");
  const c = useTranslations("common");
  const { character } = useCharacterStore();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        <InventoryTable
          data={character?.characterItems || []}
          columns={inventoryColumns}
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
