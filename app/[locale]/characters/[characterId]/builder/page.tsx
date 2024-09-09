import MotwBuilder from "@/components/characters/motw-builder";
import React from "react";
import motwCharacter from "@/db/seeds/data/characters.json";

type BuilderPageProps = {
  params: {
    characterId: string;
  };
};

export default function BuilderPage({ params }: BuilderPageProps) {
  return (
    <>
      <h1>Builder</h1>
      {/* <MotwBuilder character={motwCharacter[0]} /> */}
    </>
  );
}
