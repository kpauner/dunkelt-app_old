import React from "react";
import CharactersList from "@/features/characters/components/characters-list";
import { PageLayout } from "@/components/layout/page-layout";
import { auth } from "@/lib/auth";

export default async function CharactersPage() {
  const session = await auth();
  if (!session) {
    return <div>You must be logged in to view this page.</div>;
  }
  return (
    <PageLayout
      title="My Characters"
      description="Manage your characters and their attributes, moves, and items."
    >
      <CharactersList session={session} />
    </PageLayout>
  );
}
