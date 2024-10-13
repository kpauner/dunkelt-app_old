import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { npcs } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const query = await db.query.mysteries.findMany();

    const placeholder = [
      {
        name: "Mystery of the Lost City",
        description:
          "We suspect a high ranking cult member, behind the disappearance of a local family has escaped to Denmark. We are looking for a hunter familiar with the country to assist in the search.",
        year: 2024,
        userId: "35e5d1bf-75a3-4b0f-aef1-f47d875d0b4e",
        mysteryParticipants: [
          {
            id: 1,
            name: "Sylas Teller",
            playbook: "The Chosen",
          },
        ],
      },
    ];

    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }
    const transformedMysteries = placeholder.map((mystery) => {
      return {
        ...mystery,
      };
    });
    return c.json({ data: transformedMysteries });
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
      const bestiaryWithTags = {
        ...query,
        npcMoves: transformedNpcMoves,
        npcPowers: transformedNpcPowers,
      };

      return c.json({ data: bestiaryWithTags });
    }
  );

export default app;
