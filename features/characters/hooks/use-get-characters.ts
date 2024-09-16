import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export function useGetCharacters() {
  return useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await client.api.characters.$get();
      if (response.status !== 200) {
        throw new Error("Failed to fetch characters");
      }
      const { data } = await response.json();
      return data;
    },
  });
}
