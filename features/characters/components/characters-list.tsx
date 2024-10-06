"use client";

import React from "react";
import Grid from "@/components/layout/grid";
import { useAddCharacterDialog } from "@/features/characters/hooks/use-add-character-dialog";
import { useGetCharacters } from "@/features/characters/queries/use-get-characters";
import { calculateLevel, cn } from "@/lib/utils";
import Link from "next/link";
import { useLocale } from "next-intl";
import { AVATARS } from "@/constants/constants";
import { Skeleton } from "@/components/ui/skeleton";
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
import { CharacterResponseType } from "@/types/characters";
import Icons from "@/components/icons";

export default function CharactersList() {
  const { data: characters, isLoading } = useGetCharacters();

  if (isLoading)
    return (
      <Grid className="min-h-[70vh]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </Grid>
    );

  return (
    <Grid>
      {characters?.map((character) => (
        <CharacterCards key={character.id} character={character} />
      ))}
      <AddNewCharacterCard />
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

function AddNewCharacterCard() {
  const { onOpen } = useAddCharacterDialog();
  return (
    <Card>
      <CardContent className="flex items-center justify-center h-full w-full">
        <Button
          onClick={onOpen}
          variant="ghost"
          className="aspect-square size-28"
        >
          <Icons.add className="size-20" />
        </Button>
      </CardContent>
    </Card>
  );
}
