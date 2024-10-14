"use client";

import React from "react";
import { useGetMysteryByIdWithParticipants } from "@/features/mysteries/queries/use-get-mystery-by-id-with-participants";
import CharacterCard from "@/features/characters/components/character-card";
export default function AssignedCharacters({
  mysteryId,
}: {
  mysteryId: string;
}) {
  const { data, isLoading } = useGetMysteryByIdWithParticipants(mysteryId);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.mysteryParticipants?.length)
    return <div>No assigned characters</div>;
  if (!data) return <div>No data</div>;
  return (
    <>
      {data.mysteryParticipants.map(
        (participant) =>
          participant && (
            <CharacterCard
              key={participant.id}
              name={participant.name}
              avatar={participant.avatar}
              look={participant.look ?? ""}
              playbook={participant.playbook}
              experience={participant.experience}
              dateOfBirth={participant.dateOfBirth ?? ""}
              dateOfDeath={participant.dateOfDeath ?? ""}
              characterId={participant.id}
            />
          )
      )}
      {data.mysteryParticipants.map(
        (participant) =>
          participant && (
            <CharacterCard
              key={participant.id}
              name={participant.name}
              avatar={participant.avatar}
              look={participant.look ?? ""}
              playbook={participant.playbook}
              experience={participant.experience}
              dateOfBirth={participant.dateOfBirth ?? ""}
              dateOfDeath={participant.dateOfDeath ?? ""}
              characterId={participant.id}
            />
          )
      )}
      {data.mysteryParticipants.map(
        (participant) =>
          participant && (
            <CharacterCard
              key={participant.id}
              name={participant.name}
              avatar={participant.avatar}
              look={participant.look ?? ""}
              playbook={participant.playbook}
              experience={participant.experience}
              dateOfBirth={participant.dateOfBirth ?? ""}
              dateOfDeath={participant.dateOfDeath ?? ""}
              characterId={participant.id}
            />
          )
      )}
      {data.mysteryParticipants.map(
        (participant) =>
          participant && (
            <CharacterCard
              key={participant.id}
              name={participant.name}
              avatar={participant.avatar}
              look={participant.look ?? ""}
              playbook={participant.playbook}
              experience={participant.experience}
              dateOfBirth={participant.dateOfBirth ?? ""}
              dateOfDeath={participant.dateOfDeath ?? ""}
              characterId={participant.id}
            />
          )
      )}
      {data.mysteryParticipants.map(
        (participant) =>
          participant && (
            <CharacterCard
              key={participant.id}
              name={participant.name}
              avatar={participant.avatar}
              look={participant.look ?? ""}
              playbook={participant.playbook}
              experience={participant.experience}
              dateOfBirth={participant.dateOfBirth ?? ""}
              dateOfDeath={participant.dateOfDeath ?? ""}
              characterId={participant.id}
            />
          )
      )}
    </>
  );
}
