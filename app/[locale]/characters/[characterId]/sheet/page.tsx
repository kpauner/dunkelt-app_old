import React from "react";
import UserCharacterSheet from "@/components/characters/user-character-sheet";
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
  const character = await getCharacterSheet(parseInt(params.characterId));
  // const character = {
  //   success: false,
  //   message: "Character does not exist or you do not have access to it.",
  // };
  if (!character.success) {
    return (
      <DashboardContentLayout className="flex flex-col flex-1">
        <div className="flex-1 flex items-center justify-center text-primary-foreground font-bold text-xl text-center">
          {character.message}
        </div>
      </DashboardContentLayout>
    );
  }

  return (
    <DashboardContentLayout variant="page" className="gap-6 md:gap-6">
      <UserCharacterSheet characterSheet={character.data} />
    </DashboardContentLayout>
  );
}
