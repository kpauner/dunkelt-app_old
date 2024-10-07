import { locationMoves, locations } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferResponseType } from "hono";
import { z } from "zod";

export const SelectLocationsSchema = createSelectSchema(locations, {
  origins: z.array(z.string()),
});
export const SelectLocationMovesSchema = createSelectSchema(locationMoves);

export type SelectLocations = z.infer<typeof SelectLocationsSchema>;
export type SelectLocationMoves = z.infer<typeof SelectLocationMovesSchema>;
// API RESPONSE TYPES
export type SelectLocationsResponseType = InferResponseType<
  (typeof client.api.locations)["$get"],
  200
>["data"];
export type SelectLocationResponseType = InferResponseType<
  (typeof client.api.locations)[":id"]["$get"],
  200
>["data"];
