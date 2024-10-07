import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import { GetMoves } from "@/features/moves/api";

export function useGetMoves() {
  return useQuery({
    queryKey: [QUERY_KEYS.MOVES],
    queryFn: GetMoves,
  });
}
