import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function YourFate() {
  const { character } = useCharacterStore();
  const locale = useLocale();
  return (
    <CharacterSheetBlock
      label="Fate"
      description="The Chosen's fate"
      tooltip="Fate is a measure of how lucky a character is."
      notice="You haven't selected 3 moves"
      footer={
        <>
          <Sheet>
            <SheetTrigger>
              <Button>Edit Fate</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Fate</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </>
      }
    >
      fate here
    </CharacterSheetBlock>
  );
}
