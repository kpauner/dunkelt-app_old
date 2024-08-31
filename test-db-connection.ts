import { createClient } from "@libsql/client";
import { env } from "./lib/env";

async function testConnection() {
  const client = createClient({
    url: env.DATABASE_URL!,
    authToken: env.DB_AUTH_TOKEN!,
  });

  try {
    const result = await client.execute("SELECT 1");
    console.log("Connection successful:", result);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await client.close();
  }
}

testConnection();
