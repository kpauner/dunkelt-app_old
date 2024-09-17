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
import { Button } from "@/components/ui/button";
import { useGetCharacters } from "@/features/characters/queries";

export default function CharactersList() {
  const { data: characters, isLoading } = useGetCharacters();
  return (
    <div>
      <Grid>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="flex flex-col gap-4 overflow-hidden">
            <Avatar
              src="/images/avatars/default.png"
              size="full"
              variant="square"
              className="max-h-64 rounded-none"
            />

            <CardHeader>
              <CardTitle>Luna Westlocke Minister</CardTitle>
              <CardDescription>
                Manage your characters and their attributes, moves, and items.
              </CardDescription>
            </CardHeader>
            <CardContent>waaah</CardContent>
            <CardFooter>
              <Button>Edit</Button>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
