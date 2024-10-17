import * as React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import useCharacterStore from "../hooks/use-character-store";
import { ImprovementType } from "@/types/characters";
import { toast } from "sonner";
import { useMemo } from "react";

type Improvement = {
  label: string;
  type: ImprovementType;
  value: string | number;
  name: string;
};

type SelectcharacterImprovements = {
  id: number;
  characterId: number;
  type: ImprovementType | null;
  name: string;
  value: string;
};

export default function Improvements() {
  const t = useTranslations("playbooks");
  const { character, updateCharacter } = useCharacterStore();

  const playbookImprovements = useMemo(() => {
    const improvementsData = t.raw(
      `${character?.playbook}.improvements.options`
    );
    return (
      typeof improvementsData === "string"
        ? JSON.parse(improvementsData)
        : improvementsData
    ) as Improvement[];
  }, [t, character?.playbook]);

  const experiencePoints = character?.experience || 0;
  const maxImprovements = Math.floor(experiencePoints / 5);

  const selectedImprovements =
    character?.characterImprovements.filter((imp) => imp.type !== null)
      .length || 0;

  const isImprovementSelected = (improvement: Improvement) => {
    return character?.characterImprovements.some(
      (imp) => imp.type === improvement.type && imp.name === improvement.name
    );
  };

  const toggleImprovement = (improvement: Improvement) => {
    if (!character) return;

    const existingAttribute = character.characterImprovements.find(
      (imp) => imp.type === improvement.type && imp.name === improvement.name
    );

    if (existingAttribute) {
      // Remove the improvement if it's already selected
      const updatedAttributes = character.characterImprovements.filter(
        (imp) =>
          !(imp.type === improvement.type && imp.name === improvement.name)
      );
      updateCharacter({ characterImprovements: updatedAttributes });
    } else {
      // Add the improvement if it's not selected and we haven't reached the limit
      if (selectedImprovements < maxImprovements) {
        const newAttribute: SelectcharacterImprovements = {
          id:
            Math.max(
              0,
              ...character.characterImprovements.map((imp) => imp.id)
            ) + 1, // Generate a temporary id
          characterId: character.id,
          type: improvement.type,
          name: improvement.name,
          value: improvement.value.toString(), // Ensure value is stored as a string
        };
        updateCharacter({
          characterImprovements: [
            ...character.characterImprovements,
            newAttribute,
          ],
        });
      } else {
        toast.error(
          "Maximum improvements reached based on current experience."
        );
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {playbookImprovements.map((improvement, index) => {
        const isSelected = isImprovementSelected(improvement);
        const isDisabled =
          !isSelected && selectedImprovements >= maxImprovements;
        return (
          <Badge
            key={`${improvement.name}_${index}`}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer hover:bg-secondary-hover ${
              isDisabled ? "opacity-50" : ""
            }`}
            onClick={() => !isDisabled && toggleImprovement(improvement)}
          >
            <span className="flex items-center gap-2 py-1">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() =>
                  !isDisabled && toggleImprovement(improvement)
                }
                onClick={(e) => e.stopPropagation()}
                disabled={isDisabled}
              />
              <span>{improvement.label}</span>
            </span>
          </Badge>
        );
      })}
    </div>
  );
}
