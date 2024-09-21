"use client";

import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import PlaybookSheet from "./playbook-sheet";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/avatar";
import Heading from "@/components/layout/heading";
import { AVATARS } from "@/constants/constants";
import { calculateLevel } from "@/lib/utils";
import { EditCharacterForm } from "@/features/characters/components/edit-character-form";

type CharacterAvatarProps = {
  size: "sm" | "lg" | "xl" | "default";
  variant: "circle" | "square";
  className?: string;
};

export default function CharacterAvatar({
  size,
  variant,
  className,
}: CharacterAvatarProps) {
  const { character } = useCharacterStore();
  const t = useTranslations("playbooks");

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-2">
      <Avatar
        className=""
        variant="square"
        size="xl"
        src={character?.avatar || AVATARS.DEFAULT}
      />
      <div className="flex flex-col justify-between">
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground leading-none tracking-tight flex gap-2">
            <span className="font-black tracking-wider text-foreground uppercase">
              {character.playbook}
            </span>
            <span className="font-bold uppercase">
              Lv. {calculateLevel(character.experience).level}
            </span>
          </span>
          <Heading as="h1" size="sm" className="text-primary-foreground">
            {character?.name}{" "}
            <span className="text-muted-foreground text-sm  items-baseline">
              {character.pronouns}
            </span>
          </Heading>
        </div>

        <PlaybookSheet
          title="Identity"
          description="View your playbook"
          buttonText="View"
        >
          <div className="flex flex-col gap-4 py-4">
            <Avatar
              className="mx-auto"
              variant="square"
              size="xl"
              src={character?.avatar || AVATARS.DEFAULT}
            />

            <Heading
              as="h1"
              size="xs"
              className="text-primary-foreground text-center"
            >
              {character?.name}
            </Heading>
            <p className="text-muted-foreground text-center">
              {character?.playbook}
            </p>
          </div>
          <EditCharacterForm />
        </PlaybookSheet>
      </div>
    </div>
  );
}
