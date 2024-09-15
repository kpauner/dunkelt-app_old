import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await client.api.items.$get();
      if (response.status !== 200) {
        throw new Error("Failed to fetch items");
      }
      const { data } = await response.json();
      return data;
    },
  });
}
