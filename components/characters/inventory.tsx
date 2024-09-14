import { SelectItems } from "@/types/items";
import InventoryTable from "./inventory-table";
import data from "@/db/seeds/data/items.json";

type InventoryProps = {
  items: SelectItems[];
};

export function Inventory({ items }: InventoryProps) {
  const displayItems = items.slice(0, 2);

  return <InventoryTable data={data} />;
}
