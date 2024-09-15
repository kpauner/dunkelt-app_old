import { db } from "@/db";

export async function getItems() {
  return db.query.items.findMany();
}
