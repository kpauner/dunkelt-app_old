import React from "react";
import { Checkbox } from "../ui/checkbox";

type LuckProps = {
  data: number;
  handleCharacterChange?: (newLuck: number) => void;
};

export default function Luck({ data, handleCharacterChange }: LuckProps) {
  return (
    <div className="flex gap-2 justify-between items-center">
      <span className="text-sm">Okey</span>
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 6, 7].map((index) => (
          <Checkbox
            key={index}
            id={`luck-${index}`}
            checked={index < data}
            onCheckedChange={(checked) => {
              handleCharacterChange?.(checked ? index + 1 : index);
            }}
            className="w-8 h-8"
          />
        ))}
      </div>
      <span className="text-sm">Doomed {data}</span>
    </div>
  );
}
