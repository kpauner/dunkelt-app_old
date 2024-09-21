import { CharacterSheetBlock } from "@/components/ui/character-sheet";
import React from "react";
import useCharacterStore from "@/features/characters/hooks/use-character-store";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import { SKELETON_HEIGHT } from "@/config/site.config";
import { Skeleton } from "@/components/ui/skeleton";
import { inventoryColumns } from "@/components/characters/inventory-columns";

import TableItems from "@/features/items/components/table-items";
import { useEditInventorySheet } from "@/features/characters/hooks/use-edit-inventory-sheet";

export default function CharacterInventory() {
  const { character } = useCharacterStore();
  const { onOpen } = useEditInventorySheet();

  if (!character) {
    return <Skeleton className="w-full h-40" height={SKELETON_HEIGHT + 120} />;
  }

  return (
    <div>
      <CharacterSheetBlock
        label="Gear"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        tooltip="Moves are actions that your character can perform."
        notice={
          character.characterMoves.length < 3
            ? "You haven't selected 3 moves"
            : undefined
        }
        footer={
          <Button variant="ghost" size="icon" onClick={onOpen}>
            <Icons.settings />
          </Button>
        }
      >
        <TableItems
          data={character.characterItems}
          columns={inventoryColumns as any}
          className="bg-none border-none p-0 dark:bg-transparent"
          showFacetedFilter={false}
          showViewOptions={false}
          showRowsPerPage={false}
        />
      </CharacterSheetBlock>
    </div>
  );
}
