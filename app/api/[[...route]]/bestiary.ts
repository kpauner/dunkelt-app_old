import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { insertItemsSchema } from "@/types/items";
import { db } from "@/db";
import { bestiary, items } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { InsertBestiarySchema } from "@/types/bestiary";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const data = await db.query.bestiary.findMany();
    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const query = await db.query.bestiary.findFirst({
        where: eq(bestiary.id, id),
      });
      return c.json({ data: query });
    }
  )
  .post("/", zValidator("json", InsertBestiarySchema), async (c) => {
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
    //     weaknesses: values.weaknesses,
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
  });

export default app;
