import { client } from "@/lib/hono";

export async function GetItems() {
  const response = await client.api.items.$get();

  if (response.status !== 200) {
    throw new Error("Failed to fetch items");
  }
  const { data } = await response.json();
  return data;
}

export async function GetItemById(id: string) {
  const response = await client.api.items[":id"].$get({
    param: { id },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch item");
  }
  const { data } = await response.json();
  return data;
}
