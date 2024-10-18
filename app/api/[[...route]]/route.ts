import { Hono, Context } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/lib/auth";
import { logger } from "hono/logger";
import { Session } from "next-auth";
import { cors } from "hono/cors";
import items from "./items";
import inventory from "./inventory";
import characters from "./characters";
import bystanders from "./bystanders";
import bestiary from "./bestiary";
import locations from "./locations";
import npcs from "./npcs";
import moves from "./moves";
import mysteries from "./mysteries";

type CustomVariableMap = {
  session: Session | null;
};
const app = new Hono<{ Variables: CustomVariableMap }>().basePath("/api");

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL!], // Add your frontend URL(s) here
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// app.use("*", logger());

app.use("*", async (c, next) => {
  const session = await auth();
  c.set("session", session);
  await next();
});

const routes = app
  .route("/bestiary", bestiary)
  .route("/items", items)
  .route("/inventory", inventory)
  .route("/characters", characters)
  .route("/bystanders", bystanders)
  .route("/locations", locations)
  .route("/npcs", npcs)
  .route("/moves", moves)
  .route("/mysteries", mysteries);

// Error handling
app.onError((err, c) => {
  console.error("Global error:", err);
  return c.json({ error: "Internal Server Error" }, 500);
});

// 404 handler
app.notFound((c) => {
  console.log("Route not found:", c.req.method, c.req.url);
  return c.json({ error: "Not Found" }, 404);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export type AppType = typeof routes;
