import React from "react";
import { useNewItem } from "@/features/items/hooks/use-new-item-state";
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

type Props = {
  buttonText: string;
};

export default function AddNewItemSheet({ buttonText }: Props) {
  const { isOpen, onOpen, onClose } = useNewItem();
  const t = useTranslations("items");
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("label")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        add item
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" type="submit">
              {buttonText}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
