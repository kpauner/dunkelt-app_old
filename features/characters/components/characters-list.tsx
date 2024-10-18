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
import { Session } from "next-auth";
import CharacterCard from "./character-card";

type CharactersListProps = {
  session: Session | null;
};

export default function CharactersList({ session }: CharactersListProps) {
  const { data: characters, isLoading } = useGetCharacters();

  if (isLoading)
    return (
      <Grid className="min-h-[60vh]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </Grid>
    );

  return (
    <Grid>
      {characters?.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          avatar={character.avatar}
          look={character.look || ""}
          playbook={character.playbook || ""}
          experience={character.experience}
          dateOfBirth={character.dateOfBirth || "unknown"}
          dateOfDeath={character.dateOfDeath || "unknown"}
          characterId={character.id}
          showDetails={true}
        />
      ))}
      <AddNewCharacterCard />
    </Grid>
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
