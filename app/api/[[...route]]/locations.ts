import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { locations } from "@/db/schema";

type CustomVariableMap = {
  session: Session | null;
};

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const locationsWithMoves = await db.query.locations.findMany({
      with: {
        locationMoves: {
          with: {
            move: true,
          },
          columns: {},
        },
      },
    });

    if (!locationsWithMoves) {
      return c.json({ message: "Locations not found" }, 404);
    }

    const transformedLocations = locationsWithMoves.map((location) => ({
      ...location,
      locationMoves: location.locationMoves.map(({ move }) => move),
    }));

    return c.json({ data: transformedLocations });
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const locationWithMoves = await db.query.locations.findFirst({
      where: eq(locations.id, Number(id)),
      with: {
        locationMoves: {
          with: {
            move: true,
          },
          columns: {},
        },
      },
    });

    if (!locationWithMoves) {
      return c.json({ message: "Location not found" }, 404);
    }

    const transformedLocation = {
      ...locationWithMoves,
      locationMoves: locationWithMoves.locationMoves.map(({ move }) => move),
    };

    return c.json({ data: transformedLocation });
  });

export default app;
