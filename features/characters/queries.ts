import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { GetCharacterById, GetCharacters } from "./api";

export function useGetCharacters() {
  return useQuery({
    queryKey: ["characters"],
    queryFn: GetCharacters,
  });
}

export function useGetCharacterById(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: ["character", { id }],
    queryFn: () => GetCharacterById(id),
  });
}
