import React from "react";
import { SelectItems } from "@/types/items";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import useCharacterStore from "@/features/characters/hooks/use-character-store";

export default function InventoryActions({ row }: { row: SelectItems }) {
  const { character, setCharacter } = useCharacterStore();
  if (!character) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.morevertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            const updateItem = character.characterItems.filter(
              (item) => item.id !== row.id
            );
            setCharacter({
              ...character,
              characterItems: updateItem,
            });
          }}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
