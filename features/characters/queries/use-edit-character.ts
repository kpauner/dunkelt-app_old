import { QUERY_KEYS } from "@/constants/constants";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type ResponseType = InferResponseType<
  (typeof client.api.characters)[":id"]["$put"]
>;
type RequestType = InferRequestType<
  (typeof client.api.characters)[":id"]["$put"]
>["json"];

export function useEditCharacter() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const characterId = data.id?.toString() || "";
      const response = await client.api.characters[":id"].$put({
        param: { id: characterId },
        json: data,
      });

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHARACTERS] });
      console.log("Character updated successfully:", data);

      toast.success(t("character.updated"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
