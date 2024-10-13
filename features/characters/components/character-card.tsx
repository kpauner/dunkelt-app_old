import React from "react";
import { calculateLevel, cn } from "@/lib/utils";
import Link from "next/link";
import { AVATARS } from "@/constants/constants";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  List,
  ListDescription,
  ListItem,
  ListTitle,
} from "@/components/ui/list";
import Icons from "@/components/icons";
import { useSession } from "next-auth/react";
import { CharacterResponseType } from "@/types/characters";
import { useLocale } from "next-intl";

export default function CharacterCard(character: CharacterResponseType) {
  const locale = useLocale();
  const details = [
    { label: "Date of Birth", value: character.dateOfBirth },
    { label: "Date of Death", value: character.dateOfDeath },
  ];
  return (
    <Card className="overflow-hidden">
      <Avatar
        src={character.avatar || AVATARS.DEFAULT}
        size="full"
        variant="square"
        className="h-56 rounded-none"
      />

      <CardHeader className="">
        <span className="text-sm text-muted-foreground leading-none tracking-tight flex gap-2">
          <span className="font-bold text-foreground">
            {character.playbook}
          </span>
          <span className="font-bold uppercase">
            Lv. {calculateLevel(character.experience).level}
          </span>
        </span>
        <CardTitle>{character.name} </CardTitle>
        <CardDescription>
          Snake tattoo on right forearm, scar on left cheek
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <List>
          {details.map((detail, index) => (
            <ListItem
              index={index}
              className={cn(
                "h-8 px-2 flex items-center justify-between",
                index % 2 === 0 ? "bg-muted" : ""
              )}
              key={detail.label}
            >
              <ListTitle>{detail.label}</ListTitle>
              <ListDescription>{detail.value}</ListDescription>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardFooter className="">
        <Link
          prefetch={false}
          href={`/${locale}/characters/${character.id}`}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Icons.editcharacter />
        </Link>
      </CardFooter>
    </Card>
  );
}
