import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { characters } from "@/db/schema";
import { and, eq } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>().get(
  "/:id",
  zValidator(
    "param",
    z.object({
      id: z.coerce.number().int().positive(),
    })
  ),
  async (c) => {
    const session = c.get("session");
    const { id: characterId } = c.req.valid("param");

    if (!session?.user?.id) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const inventoryData = await db.query.characters.findFirst({
      where: and(
        eq(characters.id, characterId),
        eq(characters.userId, session.user.id)
      ),
      with: {
        characterItems: {
          with: {
            item: true,
          },
        },
      },
    });

    if (!inventoryData) {
      return c.json({ message: "Character not found or access denied" }, 404);
    }

    const formattedInventory = inventoryData.characterItems.map(({ item }) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      description: item.description,
      harm: item.harm,
      armor: item.armor,
      tags: item.tags,
    }));

    return c.json({ data: formattedInventory });
  }
);

export default app;
