import { QUERY_KEYS } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { GetItemById } from "@/features/items/api";

export function useGetItemById(id: string) {
  return useQuery({
    enabled: !!id,
    queryKey: [QUERY_KEYS.ITEM, { id }],
    queryFn: () => GetItemById(id),
  });
}
