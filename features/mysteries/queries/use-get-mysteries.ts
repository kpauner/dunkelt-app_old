import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetMysteries } from "@/features/mysteries/api";

export function useGetMysteries() {
  return useQuery({
    queryKey: [QUERY_KEYS.MYSTERIES],
    queryFn: GetMysteries,
    retry: 3,
    throwOnError: true,
  });
}
