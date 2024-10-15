import { client } from "@/lib/hono";
import { InferResponseType } from "hono/client";
import { createSelectSchema } from "drizzle-zod";
import { mysteries } from "@/db/schema";
import { z } from "zod";

// SCHEMA
export const SelectMysteriesSchema = createSelectSchema(mysteries, {
  description: z.array(z.string()),
});

// TYPES
export type SelectMysteries = z.infer<typeof SelectMysteriesSchema>;

// API RESPONSE TYPES
export type SelectMysteriesResponseType = InferResponseType<
  (typeof client.api.mysteries)["$get"],
  200
>["data"];
export type SelectMysteryResponseType = InferResponseType<
  (typeof client.api.mysteries)[":id"]["$get"],
  200
>["data"];
