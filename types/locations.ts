import { locations } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const SelectLocationsSchema = createSelectSchema(locations);
export type SelectLocations = InferSelectModel<typeof locations>;
