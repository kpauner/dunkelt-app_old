import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";

export default function Harm() {
  const { character, setCharacter } = useCharacterStore();
  const t = useTranslations("characters.harm");

  if (!character)
    return <Skeleton className="w-full h-40 mb-2 " height={180} />;

  return (
    <CharacterSheetBlock
      label={t("label")}
      description={t("description")}
      tooltip={t(`tooltip.${character.playbook}`)}
      alert={
        character.harm >= 4
          ? "You have reached 4 or more Harm. You are now unstable."
          : undefined
      }
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 6, 7].map((index) => (
            <Checkbox
              key={index}
              id={`harm-${index}`}
              checked={index < character?.harm}
              onCheckedChange={(checked) => {
                setCharacter({
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
