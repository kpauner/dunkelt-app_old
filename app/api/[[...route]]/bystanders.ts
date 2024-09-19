import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { bystanders } from "@/db/schema";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const data = await db.query.bystanders.findMany();
    return c.json({ data });
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const data = await db.query.bystanders.findFirst({
      where: eq(bystanders.id, Number(id)),
    });
    return c.json({ data });
  });

export default app;
