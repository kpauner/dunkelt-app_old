import { db } from "@/db";
import data from "@/db/seeds/data/locations.json";
import { locations } from "@/db/schema";
import { SelectLocations } from "@/types/locations";

export default async function seed(db: db) {
  const formattedData: Omit<SelectLocations, "id">[] = data.map((location) => ({
    name: location.name,
    description: location.description,
    type: location.type,
    origins: location.origins,
    history: location.history,
  }));
  if (!formattedData) {
    return;
  }
  await db.insert(locations).values(formattedData);
}
