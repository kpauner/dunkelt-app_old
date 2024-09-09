import React from "react";
import CharacterSheet from "@/components/characters/character-sheet";
import { getCharacterSheet } from "@/data-access/characters";
import { DashboardContentLayout } from "@/components/layout/dashboard";

const GAP = "gap-4 md:gap-4";

type CharacterSheetPageProps = {
  params: {
    characterId: string;
    locale: string;
  };
};

export default async function CharacterSheetPage({
  params,
}: CharacterSheetPageProps) {
  // const character = await getCharacterSheet(parseInt(params.characterId));
  const character = {
    success: false,
    message: "Character not found",
  };
  if (!character.success) {
    return <div>{character.message}</div>;
  }

  return (
    <DashboardContentLayout variant="page" className="gap-6 md:gap-6">
      <CharacterSheet character={character.data} />

      <pre>{JSON.stringify(character, null, 2)}</pre>
    </DashboardContentLayout>
  );
}
