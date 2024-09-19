"use client";

import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import PlaybookSheet from "./playbook-sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import Heading from "@/components/layout/heading";
import { AVATARS } from "@/constants/constants";

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
  const { character, setCharacter } = useCharacterStore();
  const t = useTranslations("motw");
  if (!character) {
    return <div>Loading...</div>;
  }
  console.log("AVATAR", character);
  return (
    <div className="flex gap-2">
      <Avatar
        className=""
        variant="square"
        size="xl"
        src={character?.avatar || AVATARS.DEFAULT}
      />
      <div className="flex flex-col justify-between">
        <Heading as="h1" size="sm" className="text-primary-foreground">
          {character?.name}{" "}
          <span className="text-muted-foreground text-sm  items-baseline">
            She/Her
          </span>
        </Heading>
        <p className="pb-4">{character?.playbook}</p>
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
          <div className="flex flex-col gap-4">
            <Input placeholder="Name" defaultValue={character.name} />

            <Input placeholder="Pronouns" defaultValue={""} />

            <Select
              onValueChange={(value) => {
                setCharacter({
                  ...character,
                  playbook: value,
                });
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a Playbook" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Playbooks</SelectLabel>
                  {t.raw("playbooks").map((playbook: any, index: any) => (
                    <SelectItem key={playbook.id} value={playbook.name}>
                      {playbook.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex flex-col gap-2">
              <Label>Look</Label>
              <Input placeholder="Look" defaultValue={character.look || ""} />
              <Select
                onValueChange={(value) => {
                  setCharacter({
                    ...character,
                    look: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Or select from list" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
        </PlaybookSheet>
      </div>
    </div>
  );
}
