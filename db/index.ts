import * as schema from "./schema";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/lib/env";

export const client = createClient({
  url: env.DATABASE_URL as string,
  authToken: env.DB_AUTH_TOKEN as string,
});

export const db = drizzle(client, { schema });
