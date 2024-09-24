import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetItems } from "@/features/items/api";

export function useGetItems() {
  return useQuery({
    queryKey: [QUERY_KEYS.ITEMS],
    queryFn: GetItems,
  });
}
