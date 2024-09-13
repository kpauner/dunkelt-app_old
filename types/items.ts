import { items } from "@/db/schema/items";
import { InferSelectModel } from "drizzle-orm";

export type SelectItems = InferSelectModel<typeof items>;
