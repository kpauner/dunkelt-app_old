import { taggable, tags } from "@/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const SelectTagsSchema = createSelectSchema(tags);
export const SelectTaggableSchema = createSelectSchema(taggable);

export type SelectTags = z.infer<typeof SelectTagsSchema>;
export type SelectTaggable = z.infer<typeof SelectTaggableSchema>;
