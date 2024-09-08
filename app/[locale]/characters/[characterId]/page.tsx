import React from "react";

type CharacterPageProps = {
  params: {
    characterId: string;
  };
};

export default function ChacterPage({ params }: CharacterPageProps) {
  return (
    <div>
      <h1>Character Page</h1>
      <p>Character ID: {params.characterId}</p>
    </div>
  );
}
