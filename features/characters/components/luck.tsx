import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";

export default function Luck() {
  const { character, updateCharacter } = useCharacterStore();
  const t = useTranslations("playbooks");
  const t2 = useTranslations("luck");

  if (!character) return null;

  return (
    <CharacterSheetBlock
      label={t2("label")}
      description={t2("description")}
      tooltip={t(`${character.playbook}.luck.tooltip`)}
      alert={character.luck === 7 ? t2("alert") : undefined}
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
                updateCharacter({
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
