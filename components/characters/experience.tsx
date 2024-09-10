import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateLevel } from "@/lib/utils";
import { Input } from "../ui/input";

type ExperienceProps = {
  experience: number;
  handleCharacterChange?: (newExperience: number) => void;
};

export function Experience({
  experience,
  handleCharacterChange,
}: ExperienceProps) {
  const { experienceInCurrentLevel } = calculateLevel(experience);

  const onExperienceChange = (index: number, checked: boolean) => {
    if (handleCharacterChange) {
      const newExperience =
        Math.floor(experience / 5) * 5 + (checked ? index + 1 : index);
      handleCharacterChange(newExperience);
    }
  };

  return (
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
        value={experience}
        onChange={(e) => handleCharacterChange?.(parseInt(e.target.value))}
        className="w-16 aspect-square"
      />
    </div>
  );
}
