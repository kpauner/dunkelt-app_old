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
    schema.bestiaryMoves,
    schema.characterMoves,
    schema.characterItems,
    schema.characters,
    schema.bestiary,
    schema.characterAttributes,
    schema.bystanders,
    schema.moves,
    schema.items,
    schema.tags,
    schema.taggable,
  ]) {
    // if (table === schema.bestiary) {
    //   console.log("harm capacity", table.harmCapacity.name);
    // }
    await db.delete(table);
  }

  await seeds.moves(db);
  await seeds.characters(db);
  await seeds.characterMoves(db);
  await seeds.characterAttributes(db);
  await seeds.bestiary(db);
  await seeds.bestiaryMoves(db);
  await seeds.items(db);
  await seeds.characterItems(db);
  await seeds.bystanders(db);
  await seeds.tags(db);
  await seeds.taggable(db);
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
