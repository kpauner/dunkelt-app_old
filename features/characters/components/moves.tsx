import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import React from "react";
import useCharacterStore from "../hooks/use-character-store";
import { Skeleton } from "@/components/ui/skeleton";
import { SKELETON_HEIGHT } from "@/config/site.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Paragraph } from "@/components/ui/paragraph";

export default function Moves() {
  const { character, setCharacter } = useCharacterStore();

  if (!character) {
    return <Skeleton className="w-full h-40 mb-2 " height={SKELETON_HEIGHT} />;
  }
  return (
    <div>
      <CharacterSheetBlock
        label="Moves"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        tooltip="Moves are actions that your character can perform."
        notice={
          character.characterMoves.length < 3
            ? "You haven't selected 3 moves"
            : undefined
        }
        footer={<p>weee</p>}
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
    </div>
  );
}
