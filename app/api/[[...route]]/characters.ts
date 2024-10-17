import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import {
  characterImprovements,
  characterItems,
  characterMoves,
  characters,
} from "@/db/schema";
import { InsertCharacterSchema } from "@/types/characters";
import { SelectCharacterSheetSchema } from "@/types/character-sheet";

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
        characterImprovements: true,
      },
    });
    const transformedData = data.map((character) => ({
      ...character,
      characterItems: character.characterItems.map(({ item }) => item),
      characterMoves: character.characterMoves.map(({ move }) => move),
      characterImprovements: character.characterImprovements,
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
            columns: {
              quantity: true,
            },
            with: {
              item: true,
            },
          },
          characterImprovements: true,
        },
      });
      if (!data) {
        return c.json({ message: "Character not found" }, 404);
      }
      const transformedData = {
        ...data,
        characterItems: data.characterItems.map((characterItem) => ({
          ...characterItem.item,
          quantity: characterItem.quantity,
        })),
        characterMoves: data.characterMoves.map(({ move }) => move),
        characterImprovements: data.characterImprovements,
        characterPlaybooks: [
          {
            name: "thechosen",
            customFields: {
              howYouFoundOut: "nightmares and visions",
              heroic: ["sacrifice", "magical powers"],
              doom: ["loss of loved ones", "the end of days"],
            },
          },
          {
            name: "thecrooked",
            customFields: {
              underworld: "You were different",
              heroic: ["Power of the people", "The end of days"],
              doom: ["Loss of loved ones", "The end of days"],
            },
          },
        ],
      };
      return c.json({ data: transformedData });
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      InsertCharacterSchema.pick({
        name: true,
        pronouns: true,
        playbook: true,
        look: true,
      })
    ),
    async (c) => {
      const session = c.get("session");
      if (!session?.user?.id) {
        return c.json({ message: "Unauthorized" }, 401);
      }
      const values = c.req.valid("json");
      const [character] = await db
        .insert(characters)
        .values({
          userId: session.user.id,
          ...values,
        })
        .returning();
      return c.json({ data: character });
    }
  )
  .put(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    zValidator("json", SelectCharacterSheetSchema),
    async (c) => {
      const session = c.get("session");
      const { id } = c.req.valid("param");
      const characterSheet = c.req.valid("json");

      if (!session?.user?.id) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const {
        characterImprovements: attributes,
        characterItems: items,
        characterMoves: moves,

        ...characterData
      } = characterSheet;

      // Fetch the character to check ownership
      const existingCharacter = await db.query.characters.findFirst({
        where: and(
          eq(characters.id, id),
          eq(characters.userId, session.user.id)
        ),
      });

      if (!existingCharacter) {
        return c.json(
          {
            message:
              "Character not found or you don't have permission to edit it",
          },
          404
        );
      }

      const result = await db.transaction(async (tx) => {
        // Update character
        const [updatedCharacter] = await tx
          .update(characters)
          .set(characterData)
          .where(eq(characters.id, id))
          .returning();

        // if (attributes) {
        //   await tx
        //     .delete(characterImprovements)
        //     .where(eq(characterImprovements.characterId, id));

        //   if (attributes.length > 0) {
        //     await tx.insert(characterImprovements).values(
        //       attributes.map((attr) => ({
        //         ...attr,
        //         characterId: id,
        //       }))
        //     );
        //   }
        // }

        // await tx
        //   .delete(characterMoves)
        //   .where(eq(characterMoves.characterId, id));

        // if (moves && moves.length > 0) {
        //   await tx.insert(characterMoves).values(
        //     moves.map((move) => ({
        //       characterId: id,
        //       moveId: move.id,
        //     }))
        //   );
        // }

        await tx
          .delete(characterItems)
          .where(eq(characterItems.characterId, id));

        if (items && items.length > 0) {
          await tx.insert(characterItems).values(
            items.map((item) => ({
              characterId: id,
              itemId: item.id,
              quantity: item.quantity || 1,
            }))
          );
        }

        return updatedCharacter;
      });

      return c.json({ data: result });
    }
  );

export default app;
