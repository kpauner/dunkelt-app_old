"use client";

import React from "react";
import Grid from "@/components/layout/grid";
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
import { useGetCharacters } from "@/features/characters/queries";
import { calculateLevel, cn } from "@/lib/utils";
import {
  List,
  ListDescription,
  ListItem,
  ListTitle,
} from "@/components/ui/list";
import { CharacterResponseType } from "@/types/characters";
import Icons from "@/components/icons";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function CharactersList() {
  const { data: characters, isLoading } = useGetCharacters();
  const characterDetails = [
    { label: "DOB", value: "03/15/1985" },
    { label: "Height", value: "6'1\" (185 cm)" },
    { label: "Weight", value: "190 lbs (86 kg)" },
    { label: "Hair", value: "Brown, short" },
    { label: "Eyes", value: "Green" },
  ];
  return (
    <Grid>
      {characters?.map((character) => (
        <CharacterCards key={character.id} character={character} />
      ))}
    </Grid>
  );
}

function CharacterCards({ character }: { character: CharacterResponseType }) {
  const locale = useLocale();
  const details = [
    { label: "DOB", value: character.dob },
    { label: "Height", value: `${character.height} cm` },
    { label: "Weight", value: `${character.weight} kg` },
    { label: "Hair", value: character.hair },
    { label: "Eyes", value: character.eyes },
  ];

  return (
    <Card className="overflow-hidden">
      <Avatar
        src="/images/avatars/default.png"
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
