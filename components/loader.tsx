import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-1 items-center justify-center h-full min-h-[200px] text-primary-foreground">
      <Loader2 className="size-8 animate-spin" />
    </div>
  );
}
