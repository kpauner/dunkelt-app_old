import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { getItems } from "@/data-access/items";
import { insertItemsSchema } from "@/types/items";
import { db } from "@/db";
import { characterItems, characters, items } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const data = await getItems();
    return c.json({ data });
  })
  .post(
    "/secret",
    zValidator("json", insertItemsSchema.pick({ name: true, type: true })),
    async (c) => {
      const session = c.get("session");
      const values = c.req.valid("json");

      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(items)
        .values({
          name: values.name,
          type: values.type,
          userId: session.user?.id,
        })
        .returning();

      return c.json({
        message: "This is a protected route",
        user: session.user?.email,
        data,
      });
    }
  )
  .get("/:id", zValidator("param", z.object({ id: z.string() })), (c) => {
    const { id } = c.req.valid("param");
    return c.json({ message: "This is a public route", id });
  });

// Public route

export default app;
