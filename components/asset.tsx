import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Heading from "./layout/heading";
import Icons from "./icons";
import { Separator } from "./ui/separator";
import { Paragraph } from "./ui/paragraph";
import TagCloud from "./tag-cloud";

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

const AssetColumn = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-6", className)}
    {...props}
  />
));
AssetColumn.displayName = "AssetColumn";

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
  type?: "bestiary" | "locations" | "items" | "bystanders";
};

const AssetTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AssetTitleProps
>(({ className, title, tags, type, children, ...props }, ref) => (
  <div ref={ref} className={cn("pb-1", className)} {...props}>
    <div className="font-medium flex gap-x-2 items-cente">
      <div className="p-px rounded-md flex items-center justify-center border-primary-dark border  aspect-square size-14">
        {type === "bestiary" ? (
          <Icons.bestiary className="size-8 text-primary-foreground" />
        ) : type === "locations" ? (
          <Icons.locations className="size-8 text-primary-foreground" />
        ) : type === "items" ? (
          <Icons.items className="size-8 text-primary-foreground" />
        ) : type === "bystanders" ? (
          <Icons.bystanders className="size-8 text-primary-foreground" />
        ) : (
          <Icons.locations className="size-8 text-primary-foreground" />
        )}
      </div>
      <div>
        <Heading size="md" className="tracking-wide capitalize">
          {title}
        </Heading>
        {tags && (
          <div className="flex gap-x-2 uppercase">
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

const AssetContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    title?: string;
    description?: string;
    children: React.ReactNode;
  }
>(({ className, title, description, children, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props}>
    {title && (
      <Heading size="sm" className="font-bold uppercase tracking-wider">
        {title}
      </Heading>
    )}
    {description && <Paragraph size="sm">{description}</Paragraph>}
    {children}
  </div>
));
AssetContent.displayName = "AssetContent";

const AssetSkills = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    description: string;
    children?: React.ReactNode;
  }
>(({ className, title, description, children, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    <Paragraph size="sm" className="">
      <strong className="font-bold text-primary-foreground capitalize tracking-wide">
        {title}:{" "}
      </strong>
      {description}
    </Paragraph>
    {children}
  </div>
));
AssetSkills.displayName = "AssetSkills";

export {
  Asset,
  AssetColumn,
  AssetHeader,
  AssetTitle,
  AssetDescription,
  AssetContent,
  AssetSkills,
};
