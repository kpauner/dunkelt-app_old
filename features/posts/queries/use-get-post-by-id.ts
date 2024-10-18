import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/constants";
import {
  GetMysteries,
  GetMysteryByIdWithParticipants,
} from "@/features/mysteries/api";
import { SelectMysteryResponseType } from "@/types/mysteries";

export function useGetMysteryByIdWithParticipants(id: string) {
  return useQuery<SelectMysteryResponseType>({
    enabled: !!id,
    queryKey: [QUERY_KEYS.MYSTERY, { id }],
    queryFn: () => GetMysteryByIdWithParticipants(id),
  });
}
