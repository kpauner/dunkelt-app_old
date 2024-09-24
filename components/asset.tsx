import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Heading from "./layout/heading";
import Icons from "./icons";
import { Separator } from "./ui/separator";

const assetVariants = cva(
  "relative w-full rounded-lg  border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        warning: "dark:border-warning/20 dark:bg-warning/10 dark:text-warning",
        destructive:
          "border-destructive/50 dark:bg-destructive text-destructive-foreground dark:border-destructive [&>svg]:text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Asset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof assetVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(assetVariants({ variant }), className)}
    {...props}
  />
));
Asset.displayName = "Asset";

const AssetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
AssetHeader.displayName = "AssetHeader";

type AssetTitleProps = {
  title: string;
  tags?: string | string[];
};

const AssetTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AssetTitleProps
>(({ className, title, tags, children, ...props }, ref) => (
  <div ref={ref} className={cn("pb-1", className)} {...props}>
    <div className="font-medium flex gap-x-2 items-cente">
      <div className="p-px rounded-md flex items-center justify-center border-primary-dark border  aspect-square h-12 w-12 ">
        <Icons.bestiary className="size-7" />
      </div>
      <div>
        <Heading size="md" className="tracking-wide capitalize">
          {title}
        </Heading>
        {tags && (
          <div className="flex gap-x-2">
            {typeof tags === "string" ? (
              <p className="text-xs text-muted-foreground">{tags}</p>
            ) : (
              tags.map((tag) => (
                <p key={tag} className="text-xs text-muted-foreground">
                  {tag}
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  </div>
));
AssetTitle.displayName = "AssetTitle";

const AssetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { text: string }
>(({ className, text, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed text-stone-400", className)}
    {...props}
  >
    {text}
  </div>
));
AssetDescription.displayName = "AssetDescription";

export { Asset, AssetHeader, AssetTitle, AssetDescription };
