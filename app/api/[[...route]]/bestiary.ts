import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { bestiary, items, taggable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { SelectBestiarySchema } from "@/types/bestiary";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const data = await db.query.bestiary.findMany();
    const bestiaryWithTags = await Promise.all(
      data.map(async (item) => {
        const taggableEntries = await db.query.taggable.findMany({
          where: and(
            eq(taggable.taggableId, item.id),
            eq(taggable.taggableType, "bestiary")
          ),
        });
        const tagNames = await db.query.tags.findMany({
          where: (fields, operators) =>
            operators.or(
              ...taggableEntries.map((entry) =>
                operators.eq(fields.id, entry.tagId)
              )
            ),
        });
        const tagsByColumn = taggableEntries.reduce(
          (acc: { [key: string]: any[] }, entry) => {
            if (!acc[entry.taggableColumn]) {
              acc[entry.taggableColumn] = [];
            }
            const tag = tagNames.find((tag) => tag.id === entry.tagId);
            if (tag) {
              acc[entry.taggableColumn].push(tag.name);
            }
            return acc;
          },
          {}
        );
        return {
          ...item,
          tags: tagsByColumn,
        };
      })
    );
    return c.json({ data: bestiaryWithTags });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const query = await db.query.bestiary.findFirst({
        where: eq(bestiary.id, id),
      });

      if (!query) {
        return c.json({ message: "Item not found" }, 404);
      }

      const taggableEntries = await db.query.taggable.findMany({
        where: and(
          eq(taggable.taggableId, query.id),
          eq(taggable.taggableType, "bestiary")
        ),
      });

      const tagNames = await db.query.tags.findMany({
        where: (fields, operators) =>
          operators.or(
            ...taggableEntries.map((entry) =>
              operators.eq(fields.id, entry.tagId)
            )
          ),
      });

      const tagsByColumn = taggableEntries.reduce(
        (acc: { [key: string]: string[] }, entry) => {
          if (!acc[entry.taggableColumn]) {
            acc[entry.taggableColumn] = [];
          }
          const tag = tagNames.find((tag) => tag.id === entry.tagId);
          if (tag) {
            acc[entry.taggableColumn].push(tag.name);
          }
          return acc;
        },
        {}
      );

      const bestiaryWithTags = {
        ...query,
        tags: tagsByColumn,
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
