import React from "react";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { Button } from "@/components/ui/button";
import Improvements from "./improvements";
import YourFate from "./playbooks/your-fate";

export function CharacterPlaybookBlocks() {
  const { character } = useCharacterStore();

  switch (character?.playbook) {
    case "The Chosen":
      return <ChosenSections />;
    case "The Crooked":
      return <CrookedSections />;
    // Add more cases for other playbooks
    default:
      return null;
  }
}

function ChosenSections() {
  const { character } = useCharacterStore();

  return (
    <>
      <YourFate />
      <CharacterSheetBlock
        label="Improvements"
        description="The Chosen's fate"
        tooltip="Fate is a measure of how lucky a character is."
        notice="You haven't selected 3 moves"
        footer={
          <>
            <Button>Edit Fate</Button>
          </>
        }
      >
        <Improvements />
      </CharacterSheetBlock>
    </>
  );
}

function CrookedSections() {
  return (
    <>
      <CharacterSheetBlock label="Background" description="The Chosen's fate">
        background here
      </CharacterSheetBlock>
      {/* Add more Chosen-specific sections */}
    </>
  );
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
