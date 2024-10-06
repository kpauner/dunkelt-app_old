import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

// API RESPONSE TYPES
export type GetBestiaryResponseType = InferResponseType<
  (typeof client.api.bestiary)["$get"],
  200
>["data"];
export type GetBestiaryByIdResponseType = InferResponseType<
  (typeof client.api.bestiary)[":id"]["$get"],
  200
>["data"];
