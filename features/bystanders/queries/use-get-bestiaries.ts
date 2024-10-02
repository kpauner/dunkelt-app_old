import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetBestiaries } from "@/features/bestiary/api";

export function useGetBestiaries() {
  return useQuery({
    queryKey: [QUERY_KEYS.BESTIARIES],
    queryFn: GetBestiaries,
  });
}
