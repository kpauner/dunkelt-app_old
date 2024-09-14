"use client";

import useCharacterStore from "@/lib/store";
import React from "react";

export default function TheChosenSelectRatings() {
  const { character, updateLuck, updateHarm, updateExperience } =
    useCharacterStore();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          value={character.luck}
          onChange={(e) => updateLuck(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
