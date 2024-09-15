"use client";

import { getItems } from "@/data-access/items";
import { useItems } from "@/hooks/use-items";
import { useQuery } from "@tanstack/react-query";

export default function TempItems() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useItems();

  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
