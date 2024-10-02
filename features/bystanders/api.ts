import { client } from "@/lib/hono";

export async function GetBestiaries() {
  const response = await client.api.bestiary.$get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch bestiaries");
  }
  const { data } = await response.json();
  return data;
}

export async function GetBestiaryById(id: string) {
  const response = await client.api.bestiary[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch character");
  }
  const { data } = await response.json();
  return data;
}
