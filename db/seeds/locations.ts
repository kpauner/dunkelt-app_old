import { db } from "@/db";
import data from "@/db/seeds/data/locations.json";
import { locations } from "@/db/schema";
import { SelectLocations } from "@/types/locations";

export default async function seed(db: db) {
  const formattedData: SelectLocations[] = data.map((location) => ({
    id: location.id,
    name: location.name,
    description: location.description,
    type: location.type || "unknown",
    origins: location.origins,
    history: location.history || "",
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(locations).values(formattedData);
}
