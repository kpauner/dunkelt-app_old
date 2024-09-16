import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { characters } from "@/db/schema";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const session = c.get("session");
    if (!session?.user?.id) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const data = await db.query.characters.findMany({
      where: eq(characters.userId, session.user.id),
      with: {
        characterMoves: {
          with: {
            move: true,
          },
        },
        characterItems: {
          with: {
            item: true,
          },
          columns: {},
        },
        characterAttributes: true,
      },
    });
    const transformedData = data.map((character) => ({
      ...character,
      characterItems: character.characterItems.map(({ item }) => item),
      characterMoves: character.characterMoves.map(({ move }) => move),
      characterAttributes: character.characterAttributes,
    }));
    return c.json({ data: transformedData });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.coerce.number().int().positive(),
      })
    ),
    (c) => {
      const { id } = c.req.valid("param");
      return c.json({ message: "This is a public route", id });
    }
  );

// Public route

export default app;
