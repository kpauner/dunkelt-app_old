import { bystanders } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type SelectBystander = InferInsertModel<typeof bystanders>;
