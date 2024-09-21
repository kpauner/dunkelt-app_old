import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetCharacterById } from "@/features/characters/api";

export function useGetCharacterById(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: [QUERY_KEYS.CHARACTER, { id }],
    queryFn: () => GetCharacterById(id),
  });
}
