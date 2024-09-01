import tags from "../schema/tags";
import { db } from "@/db";
import data from "@/db/seeds/data/tags.json";

export default async function seed(db: db) {
  await db.insert(tags).values(data);
}
