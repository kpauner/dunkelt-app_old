import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_HEIGHT } from "@/config/site.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Paragraph } from "@/components/ui/paragraph";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import { useEditMovesSheet } from "@/features/moves/hooks/use-edit-moves-sheet";
import { useTranslations } from "next-intl";

export default function CharacterMoves() {
  const { character } = useCharacterStore();
  const { onOpen } = useEditMovesSheet();
  const t = useTranslations("moves");
  if (!character) {
    return <Skeleton className="w-full h-40 mb-2 " height={SKELETON_HEIGHT} />;
  }
  return (
    <CharacterSheetBlock
      label={t("label")}
      description={t("description")}
      tooltip={t("tooltip")}
      notice={
        character.characterMoves.length < 3
          ? "You haven't selected 3 moves"
          : undefined
      }
      footer={
        <Button variant="ghost" size="icon" onClick={onOpen}>
          <Icons.settings />
        </Button>
      }
    >
      <Accordion type="multiple" className="w-full">
        {character.characterMoves.map((move) => (
          <AccordionItem key={move.id} value={move.name}>
            <AccordionTrigger className="text-sm capitalize">
              {move.name}
            </AccordionTrigger>
            <AccordionContent>
              <Paragraph size="xs">{move.description}</Paragraph>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CharacterSheetBlock>
  );
}
