import { cn } from "@/lib/utils";
import React from "react";

export default function Grid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
