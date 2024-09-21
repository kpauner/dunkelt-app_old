import React from "react";
import CharactersList from "@/features/characters/components/characters-list";
import { PageLayout } from "@/components/layout/page-layout";

export default function CharactersPage() {
  return (
    <PageLayout
      title="My Characters"
      description="Manage your characters and their attributes, moves, and items."
    >
      <CharactersList />
    </PageLayout>
  );
}
