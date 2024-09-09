"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import Icons from "../icons";
import { Button } from "./button";

type SheetSectionProps = {
  label: string;
  description: string;
  children: React.ReactNode;
  tooltip?: string;
  className?: string;
};

function ActionBar({ tooltip }: { tooltip?: string }) {
  return (
    <div className="flex gap-2 items-center absolute top-2 right-2 ">
      <Tooltip>
        <TooltipTrigger asChild>
          <Icons.alert className="text-accent-foreground animate-pulse" />
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
      {tooltip && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Icons.help />
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

const SheetSection = ({
  className,
  label,
  description,
  children,
  tooltip,
}: SheetSectionProps) => (
  <Card className={cn("relative", className)}>
    <CardHeader>
      <ActionBar tooltip={tooltip} />
      <CardTitle>{label}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
SheetSection.displayName = "SheetSection";

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
  value: string;
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

export { SheetSection, SheetSectionContainer, SheetBlock };
