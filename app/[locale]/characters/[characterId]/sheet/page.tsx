import React from "react";
import UserCharacterSheet from "@/components/characters/user-character-sheet";
import { DashboardContentLayout } from "@/components/layout/dashboard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TempItems from "@/components/characters/temp-items";
import { useItems } from "@/hooks/use-items";
import { useGetCharacters } from "@/features/characters/hooks/use-get-characters";

type CharacterSheetPageProps = {
  params: {
    characterId: string;
    locale: string;
  };
};

export default async function CharacterSheetPage({
  params,
}: CharacterSheetPageProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["characters"],
    queryFn: useGetCharacters,
  });

  return (
    <DashboardContentLayout variant="page" className="gap-6 md:gap-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserCharacterSheet
          // characterSheet={character.data}
          characterId={params.characterId}
        />
      </HydrationBoundary>
    </DashboardContentLayout>
  );
}
