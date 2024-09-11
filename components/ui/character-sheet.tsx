"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import ActionBar from "../characters/action-bar";

const CharacterSheet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-h-screen w-full flex-col ", className)}
    {...props}
  />
));
CharacterSheet.displayName = "CharacterSheet";

const CharacterSheetHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn("", className)} {...props} />
));
CharacterSheetHeader.displayName = "CharacterSheetHeader";

const CharacterSheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min gap-6",
      className
    )}
    {...props}
  />
));
CharacterSheetContent.displayName = "CharacterSheetContent";

const CharacterSheetColumn = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-6", className)}>{children}</div>
);
CharacterSheetColumn.displayName = "CharacterSheetColumn";

type CharacterSheetBlockProps = {
  label: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  tooltip?: string;
  notice?: string;
  alert?: string;
};

const CharacterSheetBlock = ({
  className,
  label,
  description,
  children,
  footer,
  tooltip,
  notice,
  alert,
}: CharacterSheetBlockProps) => (
  <Card className={cn("flex flex-col", className)}>
    <CardHeader>
      <CardTitle>{label}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">{children}</CardContent>

    {(footer || tooltip || notice || alert) && (
      <CardFooter>
        {footer}
        <ActionBar tooltip={tooltip} notice={notice} alert={alert} />
      </CardFooter>
    )}
  </Card>
);
CharacterSheetBlock.displayName = "CharacterSheetBlock";

const SheetSectionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("col-span-1 flex flex-col gap-6", className)}>
    {children}
  </div>
);
SheetSectionContainer.displayName = "SheetSectionContainer";

type SheetBlockProps = {
  label: string;
  value: string | number;
  tooltip?: string;
  className?: string;
};

const SheetBlock = ({ label, value, tooltip, className }: SheetBlockProps) => (
  <Card className={cn("aspect-square size-20 text-center", className)}>
    <div className="p-2 flex flex-col items-center h-full w-full justify-center">
      <span className="text-xs">
        {tooltip ? (
          <>
            <Tooltip>
              <TooltipTrigger>{label}</TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>{label}</>
        )}
      </span>
      <p className="font-bold text-5xl">{value}</p>
    </div>
  </Card>
);
SheetBlock.displayName = "SheetBlock";

export {
  CharacterSheet,
  CharacterSheetHeader,
  CharacterSheetContent,
  CharacterSheetColumn,
  CharacterSheetBlock,
  SheetSectionContainer,
  SheetBlock,
};
