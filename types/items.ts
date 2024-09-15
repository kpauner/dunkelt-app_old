import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type SelectItems = InferSelectModel<typeof items>;
