import { bestiary, bestiaryMoves } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferSelectModel } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { InferResponseType } from "hono";
import { z } from "zod";

export const SelectBestiarySchema = createSelectSchema(bestiary);
export const SelectBestiaryMovesSchema = createSelectSchema(bestiaryMoves);

export type Powers = {
  name: string;
  description: string;
};

export type Attack = {
  name: string;
  harm: number;
  tags: string[];
};

export type SelectBestiary = z.infer<typeof SelectBestiarySchema>;
export type SelectBestiaryMoves = InferSelectModel<typeof bestiaryMoves>;

// API RESPONSE TYPES
export type GetBestiaryResponseType = InferResponseType<
  (typeof client.api.bestiary)["$get"],
  200
>["data"];
export type GetBestiaryByIdResponseType = InferResponseType<
  (typeof client.api.bestiary)[":id"]["$get"],
  200
>["data"];
