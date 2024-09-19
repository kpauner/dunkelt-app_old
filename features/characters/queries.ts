import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetCharacterById, GetCharacters } from "./api";

export function useGetCharacters() {
  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS],
    queryFn: GetCharacters,
  });
}

export function useGetCharacterById(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: [QUERY_KEYS.CHARACTER, { id }],
    queryFn: () => GetCharacterById(id),
  });
}
