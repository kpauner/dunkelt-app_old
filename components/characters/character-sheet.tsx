"use client";

import React from "react";

type CharacterSheetProps = {
  characterId: string;
};
export default function CharacterSheet({ characterId }: CharacterSheetProps) {
  return (
    <div>
      <h1>The Chosen One</h1>
      {characterId}
      ayoo
    </div>
  );
}
