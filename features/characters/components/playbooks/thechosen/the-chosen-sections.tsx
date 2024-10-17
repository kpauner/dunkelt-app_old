import React from "react";
import { useTranslations } from "next-intl";
import Improvements from "@/features/characters/components/improvements";
import YourFate from "@/features/characters/components/playbooks/your-fate";
import { ImprovementInfo } from "@/features/characters/components/improvement-info";
import { useImprovements } from "@/features/characters/hooks/use-calculate-improvements";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { TheChosenPlaybook } from "@/types/playbooks";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";

export default function ThechosenSections() {
  const t = useTranslations("playbooks");
  const chosenPlaybook = useCharacterStore((state) =>
    state.character?.characterPlaybooks.find((p) => p.name === "thechosen")
  );
  const { showNotice } = useImprovements();

  if (!chosenPlaybook) {
    return null;
  }

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
        <Improvements />
      </CharacterSheetBlock>
    </>
  );
}
