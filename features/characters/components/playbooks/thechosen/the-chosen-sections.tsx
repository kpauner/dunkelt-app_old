import React from "react";
import { useTranslations } from "next-intl";
import Improvements from "@/features/characters/components/improvements";
import YourFate from "@/features/characters/components/playbooks/your-fate";
import { ImprovementInfo } from "@/features/characters/components/improvement-info";
import { useImprovements } from "@/features/characters/hooks/use-calculate-improvements";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { TheChosenPlaybook } from "@/types/playbooks";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import { Separator } from "@/components/ui/separator";

const ADVANCED_IMPROVEMENTS_THRESHOLD = 25;

export default function ThechosenSections() {
  const t = useTranslations("playbooks");
  const { character } = useCharacterStore();
  const { showNotice } = useImprovements();

  if (!character) {
    return null;
  }

  const chosenPlaybook = character.characterPlaybooks.find(
    (p) => p.name === "thechosen"
  );
  const currentExperience = character.experience;
  const canShowAdvancedImprovements =
    currentExperience >= ADVANCED_IMPROVEMENTS_THRESHOLD;

  return (
    <>
      <YourFate />
      <CharacterSheetBlock
        label={t("thechosen.improvements.label")}
        description={t("thechosen.improvements.description")}
        tooltip={t("thechosen.improvements.tooltip")}
        notice={
          showNotice ? "You have improvements available to select" : undefined
        }
        footer={
          <>
            <ImprovementInfo />
          </>
        }
      >
        <Improvements category="improvements" />
        {canShowAdvancedImprovements && (
          <>
            <Separator className="my-4" />
            <Improvements category="advanced_improvements" />
          </>
        )}
      </CharacterSheetBlock>
    </>
  );
}
