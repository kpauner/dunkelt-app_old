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
        "font-bold leading-none tracking-tight dark:text-stone-300",
        size === "xl" && "text-[clamp(3rem,10vmin,10rem)]",
        size === "lg" && "text-5xl md:text-6xl",
        size === "md" && "text-2xl md:text-3xl",
        size === "sm" && "text-sm md:text-xl",
        size === "xs" && "text-xs md:text-sm  tracking-tight",
        className
      )}
    >
      {children}
    </Comp>
  );
}
