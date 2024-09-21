import React, { useEffect, useState } from "react";
import { SelectItems } from "@/types/items";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { Input } from "@/components/ui/input";
import { Row } from "@tanstack/react-table";

export default function InventoryActions({ row }: { row: SelectItems }) {
  const { character, updateCharacter } = useCharacterStore();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Initialize quantity based on existing item in inventory
    const existingItem = character?.characterItems.find(
      (item) => item.id === row.id
    );
    setQuantity(existingItem ? existingItem.quantity : 0);
  }, [character, row.id]);

  if (!character) return null;
  const updateItemQuantity = (newQuantity: number) => {
    const updatedQuantity = Math.max(0, newQuantity); // Ensure quantity is not negative
    setQuantity(updatedQuantity);

    const updatedItems = character!.characterItems.filter(
      (item) => item.id !== row.id
    );
    if (updatedQuantity > 0) {
      updatedItems.push({ ...row, quantity: updatedQuantity });
    }

    updateCharacter({
      ...character!,
      characterItems: updatedItems,
    });
  };

  return (
    <div className="flex flex-row items-center">
      <Button
        variant="ghost"
        size="icon"
        className=" p-0"
        onClick={() => updateItemQuantity(quantity + 1)}
      >
        <Icons.chevronup className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => updateItemQuantity(parseInt(e.target.value, 10))}
        className="w-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button
        variant="ghost"
        size="icon"
        className="p-0"
        onClick={() => updateItemQuantity(quantity - 1)}
      >
        <Icons.chevrondown className="h-4 w-4" />
      </Button>
    </div>
  );
}
