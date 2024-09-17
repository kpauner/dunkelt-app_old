import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";

export default function Luck() {
  const { character, setCharacter } = useCharacterStore();
  const t = useTranslations("characters.luck");

  if (!character)
    return <Skeleton className="w-full h-40 mb-2 " height={180} />;

  return (
    <CharacterSheetBlock
      label="Luck"
      description={t("description")}
      tooltip={t(`tooltip.${character.playbook}`)}
      alert={
        character.luck === 7
          ? "Doomed: You have spent all your luck"
          : undefined
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center uppercase tracking-wide">
          <span className=" text-xs">Okey</span>
          <span className=" text-xs">Doomed</span>
        </div>
        <div className="flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span
            className={cn(
              "text-lg font-bold bg-muted px-1 rounded-full aspect-square h-7 items-center justify-center flex",
              {
                "text-red-500": character?.luck >= 5,
                "text-yellow-500":
                  character?.luck === 3 || character?.luck === 4,
              }
            )}
          >
            {character?.luck}
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <Checkbox
              key={index}
              id={`luck-${index}`}
              checked={index < character?.luck}
              onCheckedChange={(checked) => {
                setCharacter({
                  ...character,
                  luck: checked ? index + 1 : index,
                });
              }}
              className="w-8 h-8"
            />
          ))}
        </div>
      </div>
    </CharacterSheetBlock>
  );
}
