import React from "react";
import {
  Dashboard,
  DashboardContentLayout,
  DashboardHeader,
  DashboardTitle,
} from "@/components/layout/dashboard";
import CharactersList from "@/features/characters/components/characters-list";
import CharacterForm from "@/features/characters/components/character-form";
import { useAddCharacterDialog } from "@/features/characters/hooks/use-add-character-dialog";
import { Button } from "@/components/ui/button";

export default function CharactersPage() {
  return (
    <DashboardContentLayout
      title="My Characters"
      description="Manage your characters and their attributes, moves, and items."
    >
      <CharactersList />
    </DashboardContentLayout>
  );
}
