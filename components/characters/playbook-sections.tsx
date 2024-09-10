import React from "react";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ActionBar from "./action-bar";
import PlaybookSheet from "./playbook-sheet";

type PlaybookSectionsProps = {
  playbook: string;
};

export function PlaybookSections({ playbook }: PlaybookSectionsProps) {
  switch (playbook.toLowerCase()) {
    case "the chosen":
      return <ChosenSections />;
    case "the spooky":
      return <SpookySections />;
    // Add more cases for other playbooks
    default:
      return null;
  }
}

function ChosenSections() {
  return (
    <>
      <CharacterSheetBlock
        label="Fate"
        description="The Chosen's fate"
        tooltip="Fate is a measure of how lucky a character is."
        notice="You haven't selected 3 moves"
        footer={
          <>
            <PlaybookSheet
              title="Fate"
              description="The Chosen's fate"
              buttonText="Save changes"
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
            </PlaybookSheet>
          </>
        }
      >
        fate here
      </CharacterSheetBlock>
      {/* Add more Chosen-specific sections */}
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
