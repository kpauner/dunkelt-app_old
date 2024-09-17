import React from "react";
import {
  Dashboard,
  DashboardContentLayout,
  DashboardHeader,
  DashboardTitle,
} from "@/components/layout/dashboard";
import CharactersList from "@/features/characters/components/characters-list";

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
