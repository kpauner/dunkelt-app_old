import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { npcs } from "@/db/schema";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const query = await db.query.npcs.findMany({
      where: eq(npcs.type, "bystander"),
      with: {
        npcMoves: {
          with: {
            move: true,
          },
        },
        npcPowers: {
          with: {
            power: true,
          },
        },
      },
    });
    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }
    const transformedBystander = query.map((npc) => {
      return {
        ...npc,
        npcMoves: npc.npcMoves.map((move) => move.move),
        npcPowers: npc.npcPowers.map((power) => power.power),
      };
    });
    return c.json({ data: transformedBystander });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const query = await db.query.npcs.findFirst({
        where: eq(npcs.id, id),
        with: {
          npcMoves: {
            with: {
              move: true,
            },
          },
          npcPowers: {
            with: {
              power: true,
            },
          },
        },
      });

      if (!query) {
        return c.json({ message: "Item not found" }, 404);
      }

      const transformedNpcMoves = query.npcMoves.map((nm) => nm.move);
      const transformedNpcPowers = query.npcPowers.map((np) => np.power);
      const bystander = {
        ...query,
        npcMoves: transformedNpcMoves,
        npcPowers: transformedNpcPowers,
      };

      return c.json({ data: bystander });
    }
  );

export default app;
