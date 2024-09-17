import React from "react";

export default function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-5 gap-4">{children}</div>;
}
