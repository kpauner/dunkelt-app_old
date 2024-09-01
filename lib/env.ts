import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    DB_AUTH_TOKEN: z.string().optional(),
    LOGTAIL_SOURCE_TOKEN: z.string().optional(),
    DB_SEEDING: stringBoolean,
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["test", "development", "production"]),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DB_AUTH_TOKEN: process.env.DB_AUTH_TOKEN,
    DB_SEEDING: process.env.DB_SEEDING || "false",
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
