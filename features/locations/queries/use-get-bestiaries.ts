import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetLocations } from "@/features/locations/api";

export function useGetLocations() {
  return useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS],
    queryFn: GetLocations,
  });
}
