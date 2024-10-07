import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { moves, npcs } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const query = await db.query.moves.findMany();
    if (!query) {
      return c.json({ message: "Moves not found" }, 404);
    }

    return c.json({ data: query });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const query = await db.query.moves.findFirst({
        where: eq(moves.id, id),
      });

      if (!query) {
        return c.json({ message: "Item not found" }, 404);
      }
      return c.json({ data: query });
    }
  );

export default app;
