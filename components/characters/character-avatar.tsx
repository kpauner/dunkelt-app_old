import { cn } from "@/lib/utils";
import { CharacterSheetType } from "@/types/characters";
import React from "react";
import { Avatar } from "../ui/avatar";
import Heading from "../layout/heading";
import Icons from "../icons";
import PlaybookSheet from "./playbook-sheet";
import { Input } from "../ui/input";
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
import { FormItem, FormLabel } from "../ui/form";
import { Label } from "../ui/label";

type CharacterAvatarProps = {
  character: CharacterSheetType;
  size: "sm" | "lg" | "xl" | "default";
  variant: "circle" | "square";
  className?: string;
  handleCharacterChange: (character: CharacterSheetType) => void;
};

export default function CharacterAvatar({
  character,
  size,
  variant,
  className,
  handleCharacterChange,
}: CharacterAvatarProps) {
  const t = useTranslations("motw");

  return (
    <div className="flex gap-2">
      <Avatar
        className=""
        variant="square"
        size="xl"
        src={character?.avatar || "/images/avatars/default.png"}
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
              src={character?.avatar || "/images/avatars/default.png"}
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
                handleCharacterChange({
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
                  handleCharacterChange({
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
