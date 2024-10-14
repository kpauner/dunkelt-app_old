import { client } from "@/lib/hono";
import { InferResponseType } from "hono/client";

// API RESPONSE TYPES
export type SelectMysteriesResponseType = InferResponseType<
  (typeof client.api.mysteries)["$get"],
  200
>["data"];
export type SelectMysteryResponseType = InferResponseType<
  (typeof client.api.mysteries)[":id"]["$get"],
  200
>["data"];
