import React from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type LuckProps = {
  data: number;
  handleCharacterChange?: (newLuck: number) => void;
};

export default function Luck({ data, handleCharacterChange }: LuckProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center uppercase tracking-wide">
        <span className=" text-xs">Okey</span>
        <span className=" text-xs">Doomed</span>
      </div>
      <div className="flex items-center">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span
          className={cn(
            "text-lg font-bold bg-muted px-1 rounded-full aspect-square h-7 items-center justify-center flex",
            {
              "text-red-500": data >= 5,
              "text-yellow-500": data === 3 || data === 4,
            }
          )}
        >
          {data}
        </span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
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
    </div>
  );
}
