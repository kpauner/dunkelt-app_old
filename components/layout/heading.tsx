import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-bold leading-none tracking-tight",
        size === "xl" && "text-[clamp(3rem,10vmin,10rem)]",
        size === "lg" && "text-6xl md:text-7xl",
        size === "md" && "text-4xl md:text-5xl",
        size === "sm" && "text-xl md:text-2xl",
        size === "xs" && "text-xs md:text-sm  tracking-tight",
        className
      )}
    >
      {children}
    </Comp>
  );
}
