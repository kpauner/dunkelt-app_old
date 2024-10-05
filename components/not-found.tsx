import React from "react";
import { Paragraph } from "./ui/paragraph";

export default function NotFound({ title = "Not found" }: { title?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-md border border-primary/20 border-dashed">
      <Paragraph>{title}</Paragraph>
    </div>
  );
}
