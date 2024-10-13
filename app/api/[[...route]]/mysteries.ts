import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { mysteries, npcs } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const query = await db.query.mysteries.findMany();

    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }
    const transformedMysteries = query.map((mystery) => {
      return {
        ...mystery,
        mysteryParticipants: [
          {
            id: 1,
            name: "Sylas Teller",
            playbook: "The Chosen",
          },
        ],
      };
    });
    return c.json({ data: transformedMysteries });
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const query = await db.query.mysteries.findFirst({
      where: eq(mysteries.id, id),
      with: {
        mysteryParticipants: {
          with: {
            character: true,
            user: true,
          },
        },
      },
    });

    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }

    const transformedMysteryParticipants = query.mysteryParticipants.map(
      (mp) => mp.character
    );
    const transformedMystery = {
      ...query,
      mysteryParticipants: transformedMysteryParticipants,
    };

    return c.json({ data: transformedMystery });
  });

export default app;
