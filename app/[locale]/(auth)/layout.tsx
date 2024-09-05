import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function CodexLayout({ children }: Props) {
  return (
    <div className="min-h-screen w-full bg-background items-center justify-center flex">
      {children}
    </div>
  );
}
