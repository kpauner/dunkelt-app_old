import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetCharacters } from "@/features/characters/api";

export function useGetCharacters() {
  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS],
    queryFn: GetCharacters,
  });
}
