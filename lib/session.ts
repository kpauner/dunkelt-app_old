import { Session } from "next-auth";

export function isValidSession(
  session: Session | null
): session is Session & { user: { id: string } } {
  return !!session && !!session.user && typeof session.user.id === "string";
}
