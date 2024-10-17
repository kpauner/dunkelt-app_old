import React from "react";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import useCharacterStore from "@/features/characters/hooks/use-character-store";

import dynamic from "next/dynamic";
import ThechosenSections from "./playbooks/thechosen/the-chosen-sections";

const ChosenSections = dynamic(
  () => import("./playbooks/thechosen/the-chosen-sections"),
  { ssr: false }
);
const CrookedSections = dynamic(
  () => import("./playbooks/thecrooked/the-crooked-sections"),
  { ssr: false }
);

export function CharacterPlaybookBlocks() {
  const { character } = useCharacterStore();

  switch (character?.playbook) {
    case "thechosen":
      return <ChosenSections />;
    case "thecrooked":
      return <CrookedSections />;
    // Add more cases for other playbooks
    default:
      return null;
  }
}

function SpookySections() {
  return (
    <>
      <CharacterSheetBlock
        label="Dark Side"
        description="The Spooky's dark side"
      >
        dark side here
      </CharacterSheetBlock>
      {/* Add more Spooky-specific sections */}
    </>
  );
}

// Add more playbook-specific section components as needed
