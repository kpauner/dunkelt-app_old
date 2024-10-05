import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { npcs } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { SelectBestiarySchema } from "@/types/bestiary";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const query = await db.query.npcs.findMany({
      where: eq(npcs.type, "bestiary"),
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
    const transformedNpcMoves = query.map((npc) => {
      return {
        ...npc,
        npcMoves: npc.npcMoves.map((move) => move.move),
        npcPowers: npc.npcPowers.map((power) => power.power),
      };
    });
    return c.json({ data: transformedNpcMoves });
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
        },
      });

      if (!query) {
        return c.json({ message: "Item not found" }, 404);
      }

      const transformedNpcMoves = query.npcMoves.map((nm) => nm.move);
      const bestiaryWithTags = {
        ...query,
        npcMoves: transformedNpcMoves,
        npcPowers: [
          {
            name: "Power 1",
            description: "Description 1",
          },
          {
            name: "Power 2",
            description: "Description 2",
          },
        ],
      };

      return c.json({ data: bestiaryWithTags });
    }
  )
  .post(
    "/",
    zValidator("json", SelectBestiarySchema.omit({ id: true })),
    async (c) => {
      const session = c.get("session");
      const values = c.req.valid("json");

      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      // const [data] = await db
      //   .insert(bestiary)
      //   .values({
      //     name: values.name,
      //     type: values.type,
      //     description: values.description,
      //     armor: values.armor,
      //     powers: values.powers,
      //     weakness: values.weakness,
      //     attacks: values.attacks,
      //     harmCapacity: values.harmCapacity,
      //     origins: values.origins,
      //     signs: values.signs,
      //     countermeasures: values.countermeasures,
      //     userId: session.user?.id,
      //   })
      //   .returning();

      return c.json({
        message: "Bestiary created",
        user: session.user?.email,
        // data,
      });
    }
  );

export default app;
