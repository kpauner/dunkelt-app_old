import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { InsertItemsSchema } from "@/types/items";
import { db } from "@/db";
import { items } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const data = await db.query.items.findMany();
    return c.json({ data });
  })
  .post(
    "/",
    zValidator("json", InsertItemsSchema.pick({ name: true, type: true })),
    async (c) => {
      const values = c.req.valid("json");
      const [data] = await db.insert(items).values(values).returning();
      return c.json({ data });
    }
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const item = await db.select().from(items).where(eq(items.id, id));
      return c.json({ data: item });
    }
  );

export default app;
