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
import { Inventory } from "./inventory";
import placeholderItems from "@/db/seeds/data/items.json";
import { Paragraph } from "@/components/ui/paragraph";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import { useManageInventory } from "@/features/items/hooks/use-manage-inventory-store";
import { useQuery } from "@tanstack/react-query";
import { useGetCharacters } from "@/features/characters/hooks/use-get-characters";
import { Input } from "../ui/input";

type UserCharacterSheetProps = {
  characterId: string;
  characterSheet?: CharacterSheetType;
};
export default function UserCharacterSheet({
  characterId,
  characterSheet,
}: UserCharacterSheetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["characters"],
    queryFn: useGetCharacters,
  });

  const filteredCharacter: CharacterSheetType | undefined =
    React.useMemo(() => {
      if (Array.isArray(data)) {
        return data.find(
          (character: CharacterSheetType) =>
            character.id.toString() === characterId.toString()
        );
      }
      return undefined;
    }, [data, characterId]);

  const [character, setCharacter] = useState<CharacterSheetType | null>(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { onOpen } = useManageInventory();
  const t = useTranslations("charactersheet");

  useEffect(() => {
    if (filteredCharacter) {
      setCharacter(filteredCharacter);
    }
  }, [filteredCharacter]);

  useEffect(() => {
    if (hasUnsavedChanges) {
      toast.info("You have unsaved changes", {
        duration: Infinity,
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

  if (isLoading || !character) {
    return (
      <div className="flex-1 flex items-center justify-center text-primary-foreground font-bold text-xl text-center">
        loading...
      </div>
    );
  }

  const handleCharacterChange = (updatedCharacter: CharacterSheetType) => {
    setCharacter((prev) => ({
      ...prev,
      ...updatedCharacter,
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      setHasUnsavedChanges(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

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
          <PlaybookSections
            character={character}
            updateCharacter={handleCharacterChange}
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
          </CharacterSheetBlock>
          {/* <pre>{JSON.stringify(character, null, 2)}</pre> */}
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
          <CharacterSheetBlock
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
          </CharacterSheetBlock>
        </CharacterSheetColumn>
      </CharacterSheetContent>
    </>
  );
}
