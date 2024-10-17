import { useMemo } from "react";
import useCharacterStore from "./use-character-store";

export function useImprovements() {
  const { character } = useCharacterStore();

  const improvementInfo = useMemo(() => {
    const experiencePoints = character?.experience || 0;
    const maxImprovements = Math.floor(experiencePoints / 5);
    const selectedImprovements =
      character?.characterImprovements.filter((imp) => imp.type !== null)
        .length || 0;
    const availableImprovements = maxImprovements - selectedImprovements;

    return {
      maxImprovements,
      selectedImprovements,
      availableImprovements,
      showNotice: availableImprovements > 0,
    };
  }, [character?.experience, character?.characterImprovements]);

  return improvementInfo;
}
