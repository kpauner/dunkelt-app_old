import CharacterSheet from "@/components/characters/character-sheet";
import React from "react";
import motwCharacter from "@/db/seeds/data/characters.json";

type CharacterSheetPageProps = {
  params: {
    characterId: string;
    locale: string;
  };
};

export default function CharacterSheetPage({
  params,
}: CharacterSheetPageProps) {
  return (
    <div>
      <h1>Character Sheet</h1>
      {params.characterId}
      <CharacterSheet characterId={params.characterId} />
      {JSON.stringify(motwCharacter[0], null, 2)}
    </div>
  );
}
