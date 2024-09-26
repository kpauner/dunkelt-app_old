import { locationMoves, locations } from "@/db/schema";
import { client } from "@/lib/hono";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferResponseType } from "hono";

export const SelectLocationsSchema = createSelectSchema(locations);
export const SelectLocationMovesSchema = createSelectSchema(locationMoves);

export type SelectLocations = InferSelectModel<typeof locations>;
export type SelectLocationMoves = InferSelectModel<typeof locationMoves>;
// API RESPONSE TYPES
export type SelectLocationsResponseType = InferResponseType<
  (typeof client.api.locations)["$get"],
  200
>["data"];
export type SelectLocationResponseType = InferResponseType<
  (typeof client.api.locations)[":id"]["$get"],
  200
>["data"];
