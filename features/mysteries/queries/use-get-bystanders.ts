import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetBystanders } from "@/features/bystanders/api";

export function useGetBystanders() {
  return useQuery({
    queryKey: [QUERY_KEYS.BYSTANDERS],
    queryFn: GetBystanders,
  });
}
