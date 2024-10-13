import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import {
  GetMysteries,
  GetMysteryByIdWithParticipants,
} from "@/features/mysteries/api";

export function useGetMysteryByIdWithParticipants(id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.MYSTERY, id],
    queryFn: () => GetMysteryByIdWithParticipants(id),
  });
}
