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
    const query = await db.query.bystanders.findMany({
      with: {
        bystanderMoves: {
          with: {
            move: true,
          },
        },
      },
    });
    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }
    const transformedBystanderMoves = query.map((bystander) => {
      return {
        ...bystander,
        bystanderMoves: bystander.bystanderMoves.map((move) => move.move),
      };
    });
    return c.json({ data: transformedBystanderMoves });
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const query = await db.query.bystanders.findFirst({
      where: eq(bystanders.id, Number(id)),
      with: {
        bystanderMoves: {
          with: {
            move: true,
          },
        },
      },
    });
    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }
    const transformedBystander = {
      ...query,
      bystanderMoves: query.bystanderMoves.map((move) => move.move),
    };
    return c.json({ data: transformedBystander });
  });

export default app;
