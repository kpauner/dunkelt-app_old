import { cn } from "@/lib/utils";
import { CharacterSheetType } from "@/types/characters";
import React from "react";
import { Avatar } from "../ui/avatar";
import Heading from "../layout/heading";
import Icons from "../icons";

type CharacterAvatarProps = {
  character: CharacterSheetType;
  size: "sm" | "lg" | "xl" | "default";
  variant: "circle" | "square";
  className?: string;
};

export default function CharacterAvatar({
  character,
  size,
  variant,
  className,
}: CharacterAvatarProps) {
  return (
    <div className="flex gap-2">
      <Avatar
        className="h-full w-full aspect-square size-20"
        variant="square"
        size="xl"
        src={character?.avatar || "/images/avatars/default.png"}
      />
      <div className="flex flex-col justify-between">
        <Heading as="h1" size="sm" className="text-primary-foreground">
          {character?.name}
        </Heading>
        <p>{character?.playbook}</p>
        <Icons.settings className="w-4 h-4" />
      </div>
    </div>
  );
}
