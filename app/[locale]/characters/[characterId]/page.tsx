import React from "react";
import { GetCharacterById } from "@/features/characters/api";
import UserCharacterSheet from "@/components/characters/user-character-sheet";
import { DashboardContentLayout } from "@/components/layout/dashboard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
    <DashboardContentLayout className="grid grid-cols-1 gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserCharacterSheet characterId={params.characterId} />
      </HydrationBoundary>
    </DashboardContentLayout>
  );
}
