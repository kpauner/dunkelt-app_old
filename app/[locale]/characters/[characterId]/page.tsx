import React from "react";
import { GetCharacterById } from "@/features/characters/api";
import UserCharacterSheet from "@/components/characters/user-character-sheet";
import { PageLayout } from "@/components/layout/page-layout";
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
    <PageLayout contentLayout="list">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserCharacterSheet characterId={params.characterId} />
      </HydrationBoundary>
    </PageLayout>
  );
}
