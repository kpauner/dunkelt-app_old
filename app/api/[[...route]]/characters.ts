import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { characters } from "@/db/schema";
import { InsertCharacterSchema } from "@/types/characters";

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
        id: z.coerce.number().int().positive().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const session = c.get("session");
      if (!session?.user?.id) {
        return c.json({ message: "Unauthorized" }, 401);
      }
      if (!id) {
        return c.json({ message: "Invalid ID" }, 400);
      }
      const data = await db.query.characters.findFirst({
        where: and(
          eq(characters.id, id),
          eq(characters.userId, session.user.id)
        ),
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
      if (!data) {
        return c.json({ message: "Character not found" }, 404);
      }
      const transformedData = {
        ...data,
        characterItems: data.characterItems.map(({ item }) => item),
        characterMoves: data.characterMoves.map(({ move }) => move),
        characterAttributes: data.characterAttributes,
      };
      return c.json({ data: transformedData });
    }
  )
  .post(
    "/",
    zValidator("json", InsertCharacterSchema.pick({ name: true })),
    async (c) => {
      const session = c.get("session");
      if (!session?.user?.id) {
        return c.json({ message: "Unauthorized" }, 401);
      }
      const { name } = c.req.valid("json");
      const [character] = await db
        .insert(characters)
        .values({
          userId: session.user.id,
          name,
        })
        .returning();
      return c.json({ data: character });
    }
  )
  .put(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const session = c.get("session");
      if (!session?.user?.id) {
        return c.json({ message: "Unauthorized" }, 401);
      }
      const data = await c.req.json();
      const character = await db
        .update(characters)
        .set({
          ...data,
        })
        .returning();
      return c.json({ data: character });
    }
  );

export default app;
