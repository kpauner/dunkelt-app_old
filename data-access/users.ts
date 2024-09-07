import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { SelectUser } from "@/types/user";
import { eq } from "drizzle-orm";

export async function getUser(id: string): Promise<SelectUser | null> {
  if (!id) {
    return null;
  }
  const session = await auth();
  if (session?.user?.id !== id) {
    return null;
  }
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user[0];
}
