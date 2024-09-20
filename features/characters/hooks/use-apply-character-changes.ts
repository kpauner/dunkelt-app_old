import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { QUERY_KEYS } from "@/constants/constants";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.characters)[":id"]["$put"]
>;
type RequestType = InferRequestType<
  (typeof client.api.characters)[":id"]["$put"]
>["json"];

export function useApplyCharacterChanges() {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const characterId = data.id?.toString() || "";
      const response = await client.api.characters[":id"].$put({
        param: { id: characterId },
        json: data,
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHARACTERS] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
