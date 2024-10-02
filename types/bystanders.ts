import { bystanders } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferInsertModel } from "drizzle-orm";
import { InferResponseType } from "hono";

export type SelectBystander = InferInsertModel<typeof bystanders>;

// API RESPONSE TYPES
export type GetBystandersResponseType = InferResponseType<
  (typeof client.api.bystanders)["$get"],
  200
>["data"];
export type GetBystandersByIdResponseType = InferResponseType<
  (typeof client.api.bystanders)[":id"]["$get"],
  200
>["data"];
