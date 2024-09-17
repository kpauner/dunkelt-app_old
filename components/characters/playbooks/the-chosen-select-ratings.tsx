"use client";

import useCharacterStore from "@/features/characters/hooks/use-character-store";
import React from "react";

export default function TheChosenSelectRatings() {
  const { character, updateCharacter } = useCharacterStore();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          value={character?.luck}
          onChange={(e) => updateCharacter({ luck: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );
}
