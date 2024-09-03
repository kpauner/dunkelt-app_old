import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function CodexLayout({ children }: Props) {
  return <>{children}</>;
}
