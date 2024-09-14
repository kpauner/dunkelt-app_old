import { env } from "@/lib/env";
import { db } from ".";
import * as schema from "@/db/schema";
import * as seeds from "./seeds";

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

// USE EXECUTE IN POSTGRES TO RESET TABLES
// async function resetTable(db: db, table: Table) {
// 	return db.execute(sql`truncate table ${table} restart identity cascade`);
// }

async function seedDatabase() {
  for (const table of [
    schema.characterMoves,
    schema.characterRatings,
    schema.characters,
    schema.moves,
    schema.tags,
    schema.bestiary,
  ]) {
    // if (table === schema.bestiary) {
    //   console.log("harm capacity", table.harmCapacity.name);
    // }
    await db.delete(table);
  }

  await seeds.moves(db);
  await seeds.characters(db);
  await seeds.characterMoves(db);
  await seeds.characterRatings(db);
  await seeds.tags(db);
  await seeds.bestiary(db);
}

seedDatabase()
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding complete");
    process.exit(0);
  });
