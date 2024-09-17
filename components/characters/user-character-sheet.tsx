"use client";

import React, { useEffect } from "react";

import { useGetCharacterById } from "@/features/characters/queries";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { toast } from "sonner";
import {
  CharacterSheetBlock,
  CharacterSheetColumn,
  CharacterSheetContent,
  CharacterSheetHeader,
  SheetBlock,
} from "@/components/ui/character-sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaybookSections } from "@/components/characters/playbook-sections";
import { calculateLevel } from "@/lib/utils";
import { Experience } from "@/components/characters/experience";
import Luck from "@/features/characters/components/luck";
import { useTranslations } from "next-intl";
import PlaybookSheet from "@/components/characters/playbook-sheet";
import { Label } from "../ui/label";
import Harm from "./harm";
import CharacterAvatar from "./character-avatar";
import { Paragraph } from "@/components/ui/paragraph";

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

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-primary-foreground font-bold text-xl text-center">
        loading...
      </div>
    );
  }

  if (error) {
    return <div>Failed to load character data</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <>
      <CharacterSheetHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <CharacterAvatar size="xl" variant="square" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <SheetBlock
              key={index}
              label="Luck"
              value="3"
              tooltip="Luck is a measure of how lucky a character is."
            />
          ))}
          <SheetBlock
            label="Level"
            value={calculateLevel(character.experience).level}
            tooltip="For every 5 experience points, a character gains a level."
          />
        </div>
      </CharacterSheetHeader>

      <CharacterSheetContent>
        <CharacterSheetColumn>
          <Luck />
          <CharacterSheetBlock
            label="Harm"
            description="When you suffer harm, mark off the number of boxes equal to harm suffered."
            alert={
              character.harm >= 4
                ? "You have reached 4 or more Harm. You are now unstable."
                : undefined
            }
            tooltip={t("harm.tooltip")}
          >
            <Harm
              data={character.harm}
              handleCharacterChange={(newHarm) =>
                updateCharacter({
                  ...character,
                  harm: newHarm,
                })
              }
            />
          </CharacterSheetBlock>
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
          {/* <PlaybookSections
            character={character}
            updateCharacter={updateCharacter}
          />
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
          </CharacterSheetBlock> */}
          <pre>{JSON.stringify(character, null, 2)}</pre>
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <CharacterSheetBlock
            label="Moves"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            tooltip="Moves are actions that your character can perform."
            notice={
              character.characterMoves.length < 3
                ? "You haven't selected 3 moves"
                : undefined
            }
            footer={
              <PlaybookSheet
                title="Moves"
                description="Moves are actions that your character can perform."
                buttonText="Add move"
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                  </div>
                </div>
              </PlaybookSheet>
            }
          >
            <Accordion type="multiple" className="w-full">
              {character.characterMoves.map((move) => (
                <AccordionItem key={move.id} value={move.name}>
                  <AccordionTrigger className="text-sm capitalize">
                    {move.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Paragraph size="xs">{move.description}</Paragraph>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CharacterSheetBlock>
          {/* <CharacterSheetBlock
            label="Gear"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
            tooltip="Moves are actions that your character can perform."
            notice={
              character.characterMoves.length < 3
                ? "You haven't selected 3 moves"
                : undefined
            }
            footer={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpen(character.id)} // Pass character.id to onOpen
              >
                <Icons.settings />
              </Button>
            }
          >
            <Inventory items={placeholderItems} />
          </CharacterSheetBlock> */}
        </CharacterSheetColumn>
      </CharacterSheetContent>
    </>
  );
}
