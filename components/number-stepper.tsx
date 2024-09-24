import React from "react";
import Icons from "@/components/icons";
import { Input } from "@/components/ui/input";

type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
};

export function NumberStepper({
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  className = "",
}: NumberStepperProps) {
  // Function to handle incrementing the value
  const increment = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  // Function to handle decrementing the value
  const decrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  // Function to handle direct input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button onClick={decrement} className="p-2" disabled={value <= min}>
        <Icons.left className="h-4 w-4" />
      </button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        min={min}
        max={max}
      />
      <button onClick={increment} className="p-2" disabled={value >= max}>
        <Icons.right className="h-4 w-4" />
      </button>
    </div>
  );
}
