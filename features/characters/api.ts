import { client } from "@/lib/hono";

export async function GetCharacters() {
  const response = await client.api.characters.$get();
  if (response.status !== 200) {
    throw new Error("Failed to fetch characters");
  }
  const { data } = await response.json();
  return data;
}

export async function GetCharacterById(id: string) {
  const response = await client.api.characters[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch character");
  }
  const { data } = await response.json();
  return data;
}
