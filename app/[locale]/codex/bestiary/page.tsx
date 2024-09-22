import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { GetBestiaries } from "@/features/bestiary/api";
import { QUERY_KEYS } from "@/constants/constants";
import Bestiary from "@/components/codex/bestiary";

export default async function BestiaryPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.BESTIARY],
    queryFn: () => GetBestiaries(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Bestiary />
    </HydrationBoundary>
  );
}
