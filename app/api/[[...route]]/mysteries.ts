import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { Session } from "next-auth";
import { db } from "@/db";
import { mysteries, mysteryParticipants, npcs, users } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";

type CustomVariableMap = {
  session: Session | null;
};

function isValidSession(
  session: Session | null
): session is Session & { user: { id: string } } {
  return !!session && !!session.user && typeof session.user.id === "string";
}

const app = new Hono<{ Variables: CustomVariableMap }>()
  .get("/", async (c) => {
    const query = await db.query.mysteries.findMany();

    if (!query) {
      return c.json({ message: "Item not found" }, 404);
    }
    const transformedMysteries = query.map((mystery) => {
      return {
        ...mystery,
        mysteryParticipants: [
          {
            id: 1,
            name: "Sylas Teller",
            playbook: "The Chosen",
          },
        ],
      };
    });
    return c.json({ data: transformedMysteries });
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const query = await db.query.mysteries.findFirst({
      where: eq(mysteries.id, id),
      with: {
        mysteryParticipants: {
          with: {
            character: true,
            user: true,
          },
        },
      },
    });
    console.log("Raw query result:", JSON.stringify(query, null, 2));

    if (!query) {
      console.log("Mystery not found");
      return c.json({ message: "Item not found" }, 404);
    }

    const transformedMysteryParticipants = query.mysteryParticipants.map(
      (mp) => ({
        ...mp.character,
        userId: mp.userId,
        userName: mp.user?.name || null,
        invitedEmail: mp.invitedEmail,
        inviteStatus: mp.inviteStatus,
      })
    );
    const transformedMystery = {
      ...query,
      mysteryParticipants: transformedMysteryParticipants,
    };

    return c.json({ data: transformedMystery });
  })
  .post(
    "/:id/participants",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({ emails: z.array(z.string().email()) })),
    async (c) => {
      const { id: mysteryId } = c.req.valid("param");
      const { emails } = c.req.valid("json");
      const session = c.get("session");

      // Check if user is authenticated
      if (!isValidSession(session)) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      // Check if the mystery exists and if the current user is the owner
      const mystery = await db.query.mysteries.findFirst({
        where: and(
          eq(mysteries.id, mysteryId),
          eq(mysteries.userId, session.user.id)
        ),
      });

      if (!mystery) {
        return c.json(
          { message: "Mystery not found or you're not the owner" },
          404
        );
      }

      // Get current participants
      const currentParticipants = await db.query.mysteryParticipants.findMany({
        where: eq(mysteryParticipants.mysteryId, mysteryId),
      });

      const currentEmails = currentParticipants
        .map((p) => p.invitedEmail)
        .filter((email): email is string => email !== null);

      // Emails to add
      const emailsToAdd = emails.filter(
        (email) => !currentEmails.includes(email)
      );

      // Emails to remove
      const emailsToRemove = currentEmails.filter(
        (email) => !emails.includes(email)
      );

      // Add new participants
      const addResults = await Promise.all(
        emailsToAdd.map(async (email) => {
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          await db.insert(mysteryParticipants).values({
            mysteryId,
            userId: existingUser?.id,
            invitedEmail: email,
            inviteStatus: "pending",
          });

          // TODO: Send invitation email

          return { email, status: "invited" };
        })
      );

      // Remove participants
      if (emailsToRemove.length > 0) {
        await db
          .delete(mysteryParticipants)
          .where(
            and(
              eq(mysteryParticipants.mysteryId, mysteryId),
              inArray(mysteryParticipants.invitedEmail, emailsToRemove)
            )
          );
      }

      const removeResults = emailsToRemove.map((email) => ({
        email,
        status: "removed",
      }));

      return c.json({ data: [...addResults, ...removeResults] });
    }
  );

export default app;
