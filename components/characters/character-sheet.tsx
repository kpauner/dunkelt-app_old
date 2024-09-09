"use client";
import { Avatar } from "@/components/ui/avatar";
import Heading from "@/components/layout/heading";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SheetBlock,
  SheetSection,
  SheetSectionContainer,
} from "@/components/ui/character-sheet";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { CharacterSheetType } from "@/types/characters";

type CharacterSheetProps = {
  character: CharacterSheetType;
};
export default function CharacterSheet({ character }: CharacterSheetProps) {
  return (
    <>
      <section className="flex justify-between">
        <header className="flex gap-2">
          <Avatar
            className="h-full w-full aspect-square size-20"
            variant="square"
            size="xl"
            src={character?.avatar || "/images/avatars/default.png"}
          />
          <div>
            <Heading as="h1" size="sm" className="text-primary-foreground">
              {character?.name}
            </Heading>
            <p>{character?.playbook}</p>
          </div>
        </header>
        <SheetBlock
          label="Luck"
          value="3"
          tooltip="Luck is a measure of how lucky a character is."
        />
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SheetSectionContainer>
          <div className="flex justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <SheetBlock
                key={index}
                label="Luck"
                value="3"
                tooltip="Luck is a measure of how lucky a character is."
              />
            ))}
          </div>
          <SheetSection
            label="Luck"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
          </SheetSection>
          <SheetSection
            label="Harm"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
            className=""
          >
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
          </SheetSection>
          <SheetSection
            label="Experience"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
            className=""
          >
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
            <Checkbox id="terms" className="size-6" />
          </SheetSection>
        </SheetSectionContainer>

        <SheetSectionContainer>
          <SheetSection
            label="Background"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            hello
          </SheetSection>
          <SheetSection
            label="Background"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            hello
          </SheetSection>
        </SheetSectionContainer>

        <SheetSectionContainer>
          <SheetSection
            label="Gear"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            hello
          </SheetSection>
          <SheetSection
            label="Look"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            pick one
          </SheetSection>
          <SheetSection
            label="History"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            <Textarea />
          </SheetSection>
          <SheetSection
            label="Improvements"
            description="Luck is a measure of how lucky a character is."
            tooltip="Luck is a measure of how lucky a character is."
          >
            hello
          </SheetSection>
        </SheetSectionContainer>
      </div>
    </>
  );
}
