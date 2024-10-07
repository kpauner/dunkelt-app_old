import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import { cn } from "@/lib/utils";

export default function Harm() {
  const { character, updateCharacter } = useCharacterStore();
  const t = useTranslations("harm");

  if (!character)
    return <Skeleton className="w-full h-40 mb-2 " height={180} />;

  return (
    <CharacterSheetBlock
      label={t("label")}
      description={t("description")}
      tooltip={t("tooltip")}
      alert={character.harm >= 4 ? t("alert") : undefined}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center uppercase tracking-wide">
          <span className=" text-xs">Okey</span>
          <span className=" text-xs">Dying</span>
        </div>
        <div className="flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span
            className={cn(
              "text-lg font-bold bg-muted px-1 rounded-full aspect-square h-7 items-center justify-center flex",
              {
                "text-red-500": character?.harm >= 5,
                "text-yellow-500":
                  character?.harm === 3 || character?.harm === 4,
              }
            )}
          >
            {character?.harm}
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <Checkbox
              key={index}
              id={`harm-${index}`}
              checked={index < character?.harm}
              onCheckedChange={(checked) => {
                updateCharacter({
                  ...character,
                  harm: checked ? index + 1 : index,
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
