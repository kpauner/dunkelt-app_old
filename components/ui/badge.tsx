import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-primary-dark px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 dark:border-primary-light/20 dark:focus:ring-stone-300",
  {
    variants: {
      variant: {
        default:
          "border border-accent bg-stone-900 text-stone-50 shadow hover:bg-stone-900/80 dark:bg-accent-dark dark:text-accent dark:hover:bg-accent-dark/80 dark:border-accent/20",
        secondary:
          "border border-secondary bg-secondary text-stone-900 hover:bg-stone-100/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-stone-800/80 dark:border-secondary-foreground/20",
        destructive:
          "border-transparent bg-red-500 text-stone-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/80",
        outline: "text-primary-foreground dark:text-stone-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
