import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { cva, VariantProps } from "class-variance-authority";
import Icons from "../icons";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden cursor-pointer aspect-square flex h-full w-full items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-accent-light shadow hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80",
        square: "rounded-md",
        rounded: "rounded-md",
        circle: "rounded-full",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        md: "h-12 w-12",
        lg: "h-16 w-16",
        xl: "h-36 w-36",
        full: "h-full w-full",
      },
    },
    defaultVariants: {
      variant: "rounded",
      size: "default",
    },
  }
);

// Define props type using VariantProps and extending HTMLDivElement attributes
type AvatarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
  };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, src, alt, variant, size, fallback, children, ...props },
    ref
  ) => {
    // Determine content to display
    const content = src ? (
      <Image
        fill
        src={src}
        alt={alt || "Avatar"}
        className="h-full w-full object-cover"
      />
    ) : children ? (
      children
    ) : fallback ? (
      fallback
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <Icons.help className="size-6 text-primary-foreground" />
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative border-2 border-muted",
          avatarVariants({ variant, size, className })
        )}
        {...props}
      >
        {content}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, type AvatarProps };
