import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { cva } from "class-variance-authority";
import Icons from "../icons";

const avatarVariants = cva(
  "relative flex h-10 w-10 shrink-0 overflow-hidden cursor-pointer aspect-square",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-accent-light shadow hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 ",
        square: "rounded-md",
        rounded: "rounded-full",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-28 w-28",
      },
      defaultVariants: {
        variant: "rounded",
        size: "default",
      },
    },
  }
);

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  variant?: "rounded" | "square";
  size?: "default" | "sm" | "lg" | "xl";
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative border-2 border-muted",
          avatarVariants({ variant, size, className })
        )}
        {...props}
      >
        {src ? (
          <Image
            fill
            src={src}
            alt={alt || "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <Icons.user className="size-5 text-primary-foreground" />
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
