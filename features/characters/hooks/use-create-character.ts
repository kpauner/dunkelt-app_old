import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { QUERY_KEYS } from "@/constants/constants";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.characters.$post>;
type RequestType = InferRequestType<typeof client.api.characters.$post>["json"];

export function useCreateCharacter() {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.characters.$post({ json: data });
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
