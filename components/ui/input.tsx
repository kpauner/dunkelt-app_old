import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full rounded-md px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-primary-dark bg-background shadow-sm focus-visible:ring-1 focus-visible:ring-stone-950 dark:border-primary-dark dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300",
        ghost:
          "bg-transparent hover:bg-stone-100 focus-visible:bg-stone-100 dark:hover:bg-stone-800 dark:focus-visible:bg-stone-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
