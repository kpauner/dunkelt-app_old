import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { GetItemById, GetItems } from "./api";
import { QUERY_KEYS } from "@/constants/constants";

export function useCharacterInventory(characterId: string) {
  return useQuery({
    queryKey: ["character-inventory", characterId],
    queryFn: async () => {
      const response = await client.api.inventory[":id"].$get({
        param: { id: characterId.toString() },
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch character inventory");
      }
      const { data } = await response.json();
      return data;
    },
  });
}
