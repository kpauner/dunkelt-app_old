import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Heading from "./heading";

const pageLayoutVariants = cva("mx-auto w-full md:gap-8 pt-2", {
  variants: {
    variant: {
      default: "w-full flex-1",
      page: "max-w-screen-xl flex flex-1 flex-col gap-4 ",
      post: "max-w-screen-lg flex flex-1 flex-col gap-4 ",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {
  title?: string;

  description?: string;
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, variant, title, description, children, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(pageLayoutVariants({ variant, className }))}
      {...props}
    >
      {(title || description) && (
        <div className="flex flex-col pb-4">
          {title && (
            <Heading as="h1" size="md" className="pb-0">
              {title}
            </Heading>
          )}
          {description && (
            <p className="text-sm text-muted-foreground pt-2 md:text-xl">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </main>
  )
);
PageLayout.displayName = "PageLayout";

export { PageLayout };
