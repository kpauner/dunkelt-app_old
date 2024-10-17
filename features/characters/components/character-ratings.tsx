import { SheetBlock } from "@/components/ui/character-sheet";
import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateLevel } from "@/lib/utils";

export default function CharacterRatings() {
  const { character } = useCharacterStore();

  if (!character) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="size-20 aspect-square" />
        ))}
      </>
    );
  }
  const sumAttributeValues = (type: string) => {
    return character.characterImprovements
      .filter((attr) => attr.type === type)
      .reduce((sum, attr) => sum + parseInt(attr.value), 0);
  };

  const attributeTypes = ["charm", "cool", "sharp", "tough", "weird"];

  return (
    <>
      {attributeTypes.map((type) => (
        <SheetBlock
          key={type}
          label={type.charAt(0).toUpperCase() + type.slice(1)}
          value={sumAttributeValues(type).toString()}
          tooltip={`Sum of all ${type} attributes`}
        />
      ))}
      <SheetBlock
        label="Level"
        value={calculateLevel(character.experience).level}
        tooltip="For every 5 experience points, a character gains a level."
        className=" dark:bg-accent/20"
      />
    </>
  );
}
