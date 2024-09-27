import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Heading from "./heading";

const slideVariants = cva(
  "relative w-full h-full rounded-lg border p-6 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        warning: "dark:border-warning/20 dark:bg-warning/10 dark:text-warning",
        destructive:
          "border-destructive/50 dark:bg-destructive text-destructive-foreground dark:border-destructive [&>svg]:text-destructive-foreground",
      },
      // New grid variant
      grid: {
        true: "grid",
        false: "block",
      },
      // Grid columns
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        8: "grid-cols-8",
      },
      gap: {
        4: "gap-4",
        6: "gap-6",
        8: "gap-8",
      },
    },
    defaultVariants: {
      variant: "default",
      grid: false,
      columns: 1,
      gap: 4,
    },
  }
);

type SlideProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof slideVariants>;

const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  ({ className, variant, grid, columns, gap, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(slideVariants({ variant, grid, columns, gap }), className)}
      {...props}
    />
  )
);
Slide.displayName = "Slide";

const SlideColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-6", className)}
    {...props}
  />
));
SlideColumn.displayName = "SlideColumn";

const SlideHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, title, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn("flex flex-col gap-2", className)}
    {...props}
  >
    <Heading as="h1" size="md" className="text-accent uppercase tracking-wider">
      {title}
    </Heading>
    {children}
  </div>
));
SlideHeader.displayName = "SlideHeader";

export { Slide, SlideHeader, SlideColumn };
