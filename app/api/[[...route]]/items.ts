import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { getItems } from "@/data-access/items";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const data = await getItems();
    return c.json({ data });
  })
  .get("/secret", async (c) => {
    const session = c.get("session");
    if (!session) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    return c.json({
      message: "This is a protected route",
      user: session.user?.email,
    });
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), (c) => {
    const { id } = c.req.valid("param");
    return c.json({ message: "This is a public route", id });
  });

// Public route

export default app;
