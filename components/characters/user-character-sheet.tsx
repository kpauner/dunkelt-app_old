"use client";

import React, { useEffect } from "react";

import { toast } from "sonner";
import { useTranslations } from "next-intl";

import CharacterInventory from "@/features/characters/components/character-inventory";
import { CharacterPlaybookBlocks } from "@/features/characters/components/character-playbook-blocks";
import Harm from "@/features/characters/components/harm";
import CharacterMoves from "@/features/characters/components/character-moves";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import Luck from "@/features/characters/components/luck";
import { useGetCharacterById } from "@/features/characters/queries";
import PlaybookSheet from "@/components/characters/playbook-sheet";
import CharacterRatings from "@/features/characters/components/character-ratings";
import { Experience } from "@/components/characters/experience";
import CharacterAvatar from "./character-avatar";
import {
  CharacterSheetBlock,
  CharacterSheetColumn,
  CharacterSheetContent,
  CharacterSheetHeader,
  SheetBlock,
} from "@/components/ui/character-sheet";

type UserCharacterSheetProps = {
  characterId: string;
};
export default function UserCharacterSheet({
  characterId,
}: UserCharacterSheetProps) {
  const {
    character,
    setCharacter,
    updateCharacter,
    hasUnsavedChanges,
    saveChanges,
  } = useCharacterStore();

  const t = useTranslations("charactersheet");
  const {
    data: characterQuery,
    isLoading,
    error,
  } = useGetCharacterById(characterId);

  useEffect(() => {
    if (characterQuery) {
      setCharacter(characterQuery);
    }
  }, [characterQuery, setCharacter]);

  useEffect(() => {
    if (hasUnsavedChanges) {
      toast.info("You have unsaved changes", {
        duration: Infinity,
        id: "unsaved-changes",
        action: {
          label: "Save",
          onClick: saveChanges,
        },
      });
    } else {
      toast.dismiss("unsaved-changes");
    }
  }, [hasUnsavedChanges, saveChanges]);

  const handleSave = async () => {
    try {
      await saveChanges();
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  if (isLoading || !character) {
    return (
      <div className="flex-1 flex items-center justify-center text-primary-foreground font-bold text-xl text-center">
        loading...
      </div>
    );
  }

  if (error) {
    return <div>Failed to load character data</div>;
  }

  return (
    <>
      <CharacterSheetHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <CharacterAvatar size="xl" variant="square" />
        <div className="grid grid-cols-6 gap-2 ">
          <CharacterRatings />
        </div>
      </CharacterSheetHeader>

      <CharacterSheetContent>
        <CharacterSheetColumn>
          <Luck />
          <Harm />
          <CharacterSheetBlock
            label="Experience"
            description="Track your character's growth"
          >
            <Experience
              experience={character.experience}
              handleCharacterChange={(newExperience) =>
                updateCharacter({
                  ...character,
                  experience: newExperience,
                })
              }
            />
          </CharacterSheetBlock>
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <CharacterPlaybookBlocks />
          <pre>{JSON.stringify(character, null, 2)}</pre>
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <CharacterMoves />
          <CharacterInventory />
        </CharacterSheetColumn>
      </CharacterSheetContent>
    </>
  );
}
