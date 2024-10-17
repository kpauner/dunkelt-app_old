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
    schema.locationMoves,
    schema.characterMoves,
    schema.characterItems,
    schema.characterImprovements,
    schema.characters,
    schema.locations,
    schema.items,
    schema.tags,
    schema.taggable,
    schema.npcs,
    schema.npcMoves,
    schema.npcPowers,
    schema.powers,
    schema.moves,
    schema.mysteries,
  ]) {
    // if (table === schema.moves) {
    //   console.log("moves", table.name);
    // }
    await db.delete(table);
  }

  await seeds.moves(db);
  await seeds.powers(db);
  await seeds.npcs(db);
  await seeds.npcMoves(db);
  await seeds.npcPowers(db);
  await seeds.characters(db);
  await seeds.characterMoves(db);
  await seeds.characterImprovements(db);
  await seeds.items(db);
  await seeds.characterItems(db);
  await seeds.tags(db);
  await seeds.taggable(db);
  await seeds.locations(db);
  await seeds.locationMoves(db);
  await seeds.mysteries(db);
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
