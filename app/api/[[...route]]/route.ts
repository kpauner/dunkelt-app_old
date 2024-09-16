import { Hono, Context } from "hono";
import { handle } from "hono/vercel";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { auth } from "@/lib/auth";
import { logger } from "hono/logger";
import { Session } from "next-auth";
import items from "./items";
import inventory from "./inventory";
import characters from "./characters";

type CustomVariableMap = {
  session: Session | null;
};
const app = new Hono<{ Variables: CustomVariableMap }>().basePath("/api");

// app.use("/auth/*", authHandler());
app.use(logger());

app.use("*", async (c, next) => {
  const session = await auth();
  c.set("session", session);
  await next();
});

const routes = app
  .route("/items", items)
  .route("/inventory", inventory)
  .route("/characters", characters);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
