import { npcs } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { InferResponseType } from "hono";

export type SelectNpc = InferSelectModel<typeof npcs>;

export type Weakness = {
  name: string;
  description: string;
};

// API RESPONSE TYPES
export type GetNpcsResponseType = InferResponseType<
  (typeof client.api.npcs)["$get"],
  200
>["data"];
export type GetNpcsByIdResponseType = InferResponseType<
  (typeof client.api.npcs)[":id"]["$get"],
  200
>["data"];
