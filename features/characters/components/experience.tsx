import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import { Input } from "@/components/ui/input";
import { calculateLevel } from "@/lib/utils";

export default function Experience() {
  const { character, updateCharacter } = useCharacterStore();
  const t = useTranslations("experience");

  if (!character)
    return <Skeleton className="w-full h-40 mb-2 " height={180} />;

  const { experienceInCurrentLevel } = calculateLevel(character.experience);

  const onExperienceChange = (index: number, checked: boolean) => {
    if (updateCharacter) {
      const newExperience =
        Math.floor(character.experience / 5) * 5 +
        (checked ? index + 1 : index);

      updateCharacter({
        ...character,
        experience: newExperience,
      });
    }
  };

  return (
    <CharacterSheetBlock
      label={t("label")}
      description={t("description")}
      tooltip={t("tooltip")}
    >
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <Checkbox
              key={index}
              id={`experience-${index}`}
              checked={index < experienceInCurrentLevel}
              onCheckedChange={(checked) =>
                onExperienceChange(index, checked as boolean)
              }
              className="w-8 h-8"
            />
          ))}
        </div>
        <Input
          type="number"
          value={character.experience}
          onChange={(e) =>
            updateCharacter({
              ...character,
              experience: parseInt(e.target.value),
            })
          }
          className="w-16 aspect-square"
        />
      </div>
    </CharacterSheetBlock>
  );
}
