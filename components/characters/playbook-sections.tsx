import React from "react";
import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import PlaybookSheet from "./playbook-sheet";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TheChosenSelectRatings from "./playbooks/the-chosen-select-ratings";
import { CharacterSheetType } from "@/types/characters";

type PlaybookSectionsProps = {
  character: CharacterSheetType;
  updateCharacter: (character: CharacterSheetType) => void;
};

export function PlaybookSections({
  character,
  updateCharacter,
}: PlaybookSectionsProps) {
  switch (character.playbook) {
    case "The Chosen":
      return (
        <ChosenSections
          character={character}
          updateCharacter={updateCharacter}
        />
      );
    case "The Crooked":
      return <CrookedSections />;
    // Add more cases for other playbooks
    default:
      return null;
  }
}

function ChosenSections({ character, updateCharacter }: PlaybookSectionsProps) {
  return (
    <>
      <Alert variant="warning">
        <AlertDescription>
          <div className="flex justify-end">
            <Select>
              <SelectTrigger className="dark:border-accent-dark">
                <SelectValue placeholder="Select ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  Charm+2, Cool-1, Sharp+1, Tough+2, Weird-1
                </SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AlertDescription>
      </Alert>
      <pre>{JSON.stringify(character.characterRatings, null, 2)}</pre>

      <TheChosenSelectRatings />
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
      <CharacterSheetBlock
        label="Improvements"
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
