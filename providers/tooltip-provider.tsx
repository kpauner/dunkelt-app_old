import React, { Children } from "react";
import { TooltipProvider as Provider } from "@/components/ui/tooltip";

export default function TooltipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
