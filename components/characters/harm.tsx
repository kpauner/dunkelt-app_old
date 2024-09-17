import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import useCharacterStore from "@/features/characters/hooks/use-character-store";

type HarmProps = {
  data: number;
  handleCharacterChange?: (newHarm: number) => void;
};
export default function Harm({ data, handleCharacterChange }: HarmProps) {
  const { character, setCharacter } = useCharacterStore();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 6, 7].map((index) => (
          <Checkbox
            key={index}
            id={`harm-${index}`}
            checked={index < data}
            onCheckedChange={(checked) => {
              handleCharacterChange?.(checked ? index + 1 : index);
            }}
            className="w-8 h-8"
          />
        ))}
      </div>
    </div>
  );
}
