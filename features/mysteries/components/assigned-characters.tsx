import React from "react";

export default function AssignedCharacters({
  mysteryId,
}: {
  mysteryId: string;
}) {
  return (
    <div>
      <h1>Assigned Characters</h1>
      {mysteryId}
    </div>
  );
}
