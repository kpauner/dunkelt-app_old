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
import { inventoryColumns } from "@/components/characters/inventory-columns";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemForm from "./item-form";
import TableItems from "./table-items";

export default function ManageInventorySheet() {
  const { isOpen, onOpen, onClose } = useManageInventory();
  const { character } = useCharacterStore();
  const t = useTranslations("features.inventory");
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
        <Accordion
          type="multiple"
          className="space-y-2"
          defaultValue={["items"]}
        >
          <AccordionItem value="items">
            <AccordionTrigger className="bg-muted px-2 uppercase">
              {t("title")}
            </AccordionTrigger>
            <AccordionContent className="py-2">
              <TableItems
                data={character?.characterItems || []}
                columns={inventoryColumns as any}
                className="bg-none border-none p-0 dark:bg-transparent"
                showFacetedFilter={false}
                showViewOptions={false}
                showRowsPerPage={false}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="add-item">
            <AccordionTrigger className="bg-muted px-2">
              Add item
            </AccordionTrigger>
            <AccordionContent className="py-2">
              <ItemForm onSubmit={() => {}} disabled={false} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="create-item">
            <AccordionTrigger className="bg-muted px-2">
              Create item
            </AccordionTrigger>
            <AccordionContent className="py-2">
              <ItemForm onSubmit={() => {}} disabled={false} />
            </AccordionContent>
          </AccordionItem>
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
