import React from "react";
import { useImprovements } from "@/features/characters/hooks/use-calculate-improvements";

export function ImprovementInfo() {
  const { maxImprovements, selectedImprovements, availableImprovements } =
    useImprovements();

  return (
    <p>
      Available Improvements: {availableImprovements} / {maxImprovements}
    </p>
  );
}
