import * as React from "react";
import { cn } from "@/lib/utils";

// DescriptionList component
const DescriptionList = React.forwardRef<
  HTMLDListElement,
  React.HTMLAttributes<HTMLDListElement>
>(({ className, ...props }, ref) => (
  <dl ref={ref} className={cn("grid gap-3", className)} {...props} />
));
DescriptionList.displayName = "DescriptionList";

// DescriptionListItem component
type DescriptionListItemProps = React.HTMLAttributes<HTMLDivElement> & {
  term: React.ReactNode;
  description: React.ReactNode;
  termClassName?: string;
  descriptionClassName?: string;
};

const DescriptionListItem = React.forwardRef<
  HTMLDivElement,
  DescriptionListItemProps
>(
  (
    {
      className,
      term,
      description,
      termClassName,
      descriptionClassName,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <dt className={cn("text-muted-foreground", termClassName)}>{term}</dt>
      <dd className={cn(descriptionClassName)}>{description}</dd>
    </div>
  )
);
DescriptionListItem.displayName = "DescriptionListItem";

export { DescriptionList, DescriptionListItem };
