"use client";

import {
  CharacterSheetBlock,
  CharacterSheetColumn,
  CharacterSheetContent,
  CharacterSheetHeader,
  SheetBlock,
} from "@/components/ui/character-sheet";
import React, { useEffect, useState } from "react";
import { CharacterSheetType } from "@/types/characters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlaybookSections } from "./playbook-sections";
import { calculateLevel } from "@/lib/utils";
import { Experience } from "./experience";
import Luck from "./luck";
import { useTranslations } from "next-intl";
import PlaybookSheet from "./playbook-sheet";
import { Label } from "../ui/label";
import Harm from "./harm";
import CharacterAvatar from "./character-avatar";
import { toast } from "sonner";

type UserCharacterSheetProps = {
  characterSheet: CharacterSheetType;
};
export default function UserCharacterSheet({
  characterSheet,
}: UserCharacterSheetProps) {
  const [character, setCharacter] = useState(characterSheet);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const t = useTranslations("charactersheet");

  const handleCharacterChange = (updatedCharacter: CharacterSheetType) => {
    setCharacter((prev) => ({
      ...prev,
      ...updatedCharacter,
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      // Implement your save logic here
      // For example: await saveCharacterToDatabase(character);
      setHasUnsavedChanges(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  useEffect(() => {
    if (hasUnsavedChanges) {
      toast.info("You have unsaved changes", {
        duration: Infinity, // Keep the toast visible until dismissed
        id: "unsaved-changes",
        action: {
          label: "Save",
          onClick: handleSave,
        },
      });
    } else {
      toast.dismiss("unsaved-changes");
    }
  }, [hasUnsavedChanges]);

  return (
    <>
      <CharacterSheetHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <CharacterAvatar
          character={character}
          size="xl"
          variant="square"
          handleCharacterChange={handleCharacterChange}
        />
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
          <CharacterSheetBlock
            label="Luck"
            description={t("luck.description")}
            tooltip={t(`luck.tooltip.${character.playbook}`)}
            alert={
              character.luck === 7
                ? "Doomed: You have spent all your luck"
                : undefined
            }
          >
            <Luck
              data={character.luck}
              handleCharacterChange={(newLuck) =>
                handleCharacterChange({
                  ...character,
                  luck: newLuck,
                })
              }
            />
          </CharacterSheetBlock>
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
                handleCharacterChange({
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
                handleCharacterChange({
                  ...character,
                  experience: newExperience,
                })
              }
            />
          </CharacterSheetBlock>
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <PlaybookSections playbook={character.playbook} />
        </CharacterSheetColumn>

        <CharacterSheetColumn>
          <CharacterSheetBlock
            label="Moves"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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
                  <AccordionContent className="text-muted-foreground text-xs">
                    {move.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CharacterSheetBlock>
          <CharacterSheetBlock
            label="Inventory/Gear"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
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
                  <AccordionContent className="text-muted-foreground text-xs">
                    {move.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CharacterSheetBlock>
        </CharacterSheetColumn>
      </CharacterSheetContent>
      {/* 
      <CharacterSheetContent>
        <SheetSectionContainer>
          <SheetSection
            label="Luck"
            description="Luck is a measure of how lucky a character is."
            footer={
              <ActionBar tip="Luck is a measure of how lucky a character is." />
            }
          >
            <Luck luck={character.luck} onLuckChange={handleLuckChange} />
          </SheetSection>
          <SheetSection
            label="Harm"
            description="Luck is a measure of how lucky a character is."
            className=""
          >
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
          </SheetSection>
          <SheetSection
            label="Experience"
            description="Luck is a measure of how lucky a character is."
            footer={
              <ActionBar
                tip="Luck is a measure of how lucky a character is."
                notice="Luck is a measure of how lucky a character is."
              />
            }
          >
            <Experience
              experience={character.experience}
              onExperienceChange={handleExperienceChange}
            />
          </SheetSection>
        </SheetSectionContainer>

        <SheetSectionContainer>
          <PlaybookSections playbook={character.playbook} />
          <SheetSection
            label="Moves"
            description="Luck is a measure ofd"
            footer={
              <ActionBar
                tip="Luck is a measure of how lucky a character is."
                notice="Luck is a measure of how lucky a character is."
              />
            }
          >
            <Accordion type="multiple" className="w-full">
              {character.characterMoves.map((move) => (
                <AccordionItem key={move.id} value={move.name}>
                  <AccordionTrigger className="text-sm capitalize">
                    {move.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs">
                    {move.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SheetSection>
        </SheetSectionContainer>

        <SheetSectionContainer>
          <SheetSection
            label="Gear"
            description="Luck is a measure of how lucky a character is."
          >
            hello
          </SheetSection>
          <SheetSection
            label="Look"
            description="Luck is a measure of how lucky a character is."
          >
            pick one
          </SheetSection>
          <SheetSection
            label="History"
            description="Luck is a measure of how lucky a character is."
            footer={
              <ActionBar
                tip="Luck is a measure of how lucky a character is."
                notice="Luck is a measure of how lucky a character is."
              />
            }
          >
            <Textarea />
          </SheetSection>
          <SheetSection
            label="Improvements"
            description="Luck is a measure of how lucky a character is."
          >
            hello
          </SheetSection>
        </SheetSectionContainer>
        <pre>{JSON.stringify(character, null, 2)}</pre>
      </CharacterSheetContent>
       */}
    </>
  );
}
