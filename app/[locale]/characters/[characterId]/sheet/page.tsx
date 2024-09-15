import React from "react";
import UserCharacterSheet from "@/components/characters/user-character-sheet";
import { getCharacterSheet } from "@/data-access/characters";
import { DashboardContentLayout } from "@/components/layout/dashboard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TempItems from "@/components/characters/temp-items";
import { useItems } from "@/hooks/use-items";

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

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["items"],
    queryFn: useItems,
  });

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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TempItems />
        <UserCharacterSheet characterSheet={character.data} />
      </HydrationBoundary>
    </DashboardContentLayout>
  );
}
