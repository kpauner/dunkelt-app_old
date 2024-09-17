import React from "react";
import UserCharacterSheet from "@/components/characters/user-character-sheet";
import {
  useGetCharacterById,
  useGetCharacters,
} from "@/features/characters/queries";
import { DashboardContentLayout } from "@/components/layout/dashboard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetCharacterById } from "@/features/characters/api";

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
    queryKey: ["character", params.characterId],
    queryFn: () => GetCharacterById(params.characterId),
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
