import React from "react";
import Icons from "../icons";

export default function LoadingLogo() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Icons.logooutline className="size-14 animate-pulse text-primary-dark" />
    </div>
  );
}
