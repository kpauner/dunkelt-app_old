import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const listVariants = cva("", {
  variants: {
    variant: {
      default: "",
      warning: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & VariantProps<typeof listVariants>
>(({ className, variant, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(listVariants({ variant }), className)}
    {...props}
  />
));
List.displayName = "List";

const ListItem = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLLIElement> & { index: number }
>(({ className, index, ...props }, ref) => (
  <li
    className={cn(
      "h-8 px-2 flex items-center justify-between",
      index % 2 === 0 ? "bg-primary-dark" : ""
    )}
    {...props}
  />
));
ListItem.displayName = "ListItem";

const ListKey = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "font-medium leading-none tracking-tight text-muted-foreground",
      className
    )}
    {...props}
  />
));
ListKey.displayName = "ListKey";

const ListValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
ListValue.displayName = "ListValue";

const ListTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "font-medium leading-none tracking-tight text-muted-foreground",
      className
    )}
    {...props}
  />
));
ListTitle.displayName = "ListTitle";

const ListDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
ListDescription.displayName = "ListDescription";

export { List, ListItem, ListKey, ListTitle, ListDescription, ListValue };
